'use strict';

angular.module('calls').controller('ContactsController', ['$scope', 'Contacts', 'Auth', function($scope, Contacts, Auth){


  $scope.find = function() {
    $scope.contacts = Contacts.query();
  };
}]);