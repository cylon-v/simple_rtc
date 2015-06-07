'use strict';

angular.module('calls').controller('ContactsController', ['$scope', 'Contacts', function($scope, Contacts){
  $scope.find = function() {
    $scope.contacts = Contacts.query();
  };
}]);