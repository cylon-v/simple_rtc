'use strict';

var PeerConnection = window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
var IceCandidate = window.mozRTCIceCandidate || window.RTCIceCandidate;
var SessionDescription = window.mozRTCSessionDescription || window.RTCSessionDescription;
navigator.getUserMedia = navigator.getUserMedia || navigator.mozGetUserMedia || navigator.webkitGetUserMedia;

app.controller('CallsController', ['$scope', 'Socket','Contacts', 'Calls', '$stateParams', function($scope, Socket, Contacts, Calls, $stateParams){
  var pc, mediaRecorder;

  var isOutgoing = $stateParams.direction === 'outgoing';
  var from = $stateParams.from;
  var to = $stateParams.to;
  var id = isOutgoing ? to : from;
  var options = { 'OfferToReceiveAudio': true, 'OfferToReceiveVideo': true };
  var chunks = [];

  $scope.hangup = function () {
    mediaRecorder.stop();
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
    document.getElementById("camera").src = URL.createObjectURL(event.stream);
  };

  var gotStream = function(stream) {
    pc = new PeerConnection(null);
    pc.addStream(stream);
    pc.onicecandidate = gotIceCandidate;
    pc.onaddstream = gotRemoteStream;
    if (!isOutgoing) {
      Socket.emit('call.ready', {from: from, to: to})
    }

    mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.ondataavailable = function (e) {
      chunks.push(e.data);
      console.log(e.data)
    };
    mediaRecorder.onstop = function(e) {
      var blob = new Blob(chunks, { 'type' : 'audio/ogg; codecs=opus' });
      chunks = [];
      var audio = document.getElementById("record");
      audio.src = window.URL.createObjectURL(blob);

      var reader = new window.FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = function() {
        var base64data = reader.result;

        var call = new Calls ({
          name: $scope.contact.name + ' ' + Date.now(),
          data: base64data
        });

        call.$save();
      };
    };
    mediaRecorder.start(1000);
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
    console.log(message);
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
    console.log('ready');
    pc.createOffer(
      gotLocalDescription,
      gotError,
      options
    );
  });

  navigator.getUserMedia({audio: true, video: true}, gotStream, gotError);
}]);