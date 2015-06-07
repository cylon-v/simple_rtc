'use strict';

app.controller('CallsController', ['$scope', 'Socket','Contacts', '$stateParams', function($scope, Socket, Contacts, $stateParams){
  Contacts.get({id: $stateParams.id}, function(contact){
    $scope.contact = contact;
  });
  Contacts.call({id: $stateParams.id});
}]);