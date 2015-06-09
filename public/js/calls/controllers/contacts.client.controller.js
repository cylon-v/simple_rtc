'use strict';

angular.module('calls').controller('ContactsController', ['$scope', 'Contacts', 'Socket', 'Auth', '$location',
  function($scope, Contacts, Socket, Auth, $location){
    var user;

    $scope.find = function() {
      $scope.contacts = Contacts.query();
    };

    Auth.get().then(function(u){
      user = u;
    });

    $scope.call = function(id) {
      $location.path('/call/' + user.id + '/' + id + '/outgoing');
    };

    $scope.me = function(id) {
      return id === user.id;
    };

    Socket.on('user.authorize', function(){
      Socket.emit('user.authorize.response', user);
    });

    Socket.on('call', function(from){
      $location.path('/call/' + from.id + '/' + user.id + '/incoming');
    });
}]);