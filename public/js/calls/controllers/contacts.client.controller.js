'use strict';

angular.module('calls').controller('ContactsController', ['$scope', 'Contacts', 'Socket', 'Auth', '$location',
  function($scope, Contacts, Socket, Auth, $location){
    $scope.find = function() {
      $scope.contacts = Contacts.query();
    };
    $scope.call = function(id) {
      Auth.get().then(function(user){
        $location.path('/call/' + user.id + '/' + id + '/outgoing');
      });
    };

    Socket.on('user.authorize', function(){
      Auth.get().then(function(user){
        Socket.emit('user.authorize.response', user);
      });
    });

    Socket.on('call', function(from){
      Auth.get().then(function(user){
        $location.path('/call/' + from.id + '/' + user.id + '/incoming');
      });
    });
}]);