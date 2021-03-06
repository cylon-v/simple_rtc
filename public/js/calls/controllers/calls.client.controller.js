'use strict';

var PeerConnection = window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
var IceCandidate = window.mozRTCIceCandidate || window.RTCIceCandidate;
var SessionDescription = window.mozRTCSessionDescription || window.RTCSessionDescription;
navigator.getUserMedia = navigator.getUserMedia || navigator.mozGetUserMedia || navigator.webkitGetUserMedia;

angular.module('calls').controller('CallsController', ['$scope', '$stateParams', '$location', 'Socket','Contacts', 'Calls', function($scope, $stateParams, $location, Socket, Contacts, Calls){
  var pc, mediaRecorder;

  var isOutgoing = $stateParams.direction === 'outgoing';
  var from = $stateParams.from;
  var to = $stateParams.to;
  var id = isOutgoing ? to : from;
  var options = { 'OfferToReceiveAudio': true };

  $scope.hangup = function () {
    Socket.emit('call.hang-up', {from: from, to: to});
  };

  Socket.emit('call.connect', {from: from, to: to});

  Contacts.get({id: id}, function(contact){
    $scope.contact = contact;
  });

  if (isOutgoing) {
    Contacts.call({id: $stateParams.to});
  }

  var gotIceCandidate = function(event){
    if (event.candidate) {
      sendMessage({
        type: 'candidate',
        label: event.candidate.sdpMLineIndex,
        id: event.candidate.sdpMid,
        candidate: event.candidate.candidate
      });
    }
  };

  var gotLocalDescription = function(description){
    pc.setLocalDescription(description);
    var message = {from: from, to: to, type: description.type, sdp: description.sdp};
    sendMessage(message);
  };

  var gotRemoteStream = function(event){
    document.getElementById('phone').src = URL.createObjectURL(event.stream);
  };

  var gotStream = function(stream) {
    pc = new PeerConnection(null);
    pc.addStream(stream);
    pc.onicecandidate = gotIceCandidate;
    pc.onaddstream = gotRemoteStream;
    if (!isOutgoing) {
      Socket.emit('call.ready', {from: from, to: to});
    }

    var call = new Calls ({
      name: $scope.contact.name,
      data: ''
    });
    call.$save();

    mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.ondataavailable = function (e) {
      var blob = new Blob([e.data], { 'type' : 'audio/ogg; codecs=opus' });
      var reader = new window.FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = function() {
        call.data = reader.result;
        call.$update();
      }
    };
    mediaRecorder.start(5000);
  };

  var gotError = function(error) {
    console.log(error);
  };

  var sendMessage = function(message){
    message.from = from;
    message.to = to;
    Socket.emit('call.message', message);
  };

  Socket.on('call.message', function(message){
    if (message.type === 'offer') {
      pc.setRemoteDescription(new SessionDescription(message));
      pc.createAnswer(
        gotLocalDescription,
        gotError,
        options
      );
    }
    else if (message.type === 'answer') {
      pc.setRemoteDescription(new SessionDescription(message));
    }
    else if (message.type === 'candidate') {
      var candidate = new IceCandidate({sdpMLineIndex: message.label, candidate: message.candidate});
      pc.addIceCandidate(candidate);
    }
  });

  Socket.on('call.ready', function(){
    pc.createOffer(
      gotLocalDescription,
      gotError,
      options
    );
  });

  Socket.on('call.hang-up', function(message){
    Socket.emit('call.hang-up.accepted', message);
    mediaRecorder.stop();
    pc.close();
    $location.path('/');
  });

  navigator.getUserMedia({audio: true}, gotStream, gotError);
}]);