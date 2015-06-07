'use strict';

var app = angular.module('calls', ['ngResource', 'ui.router']).config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
  $urlRouterProvider.otherwise('/');

  $stateProvider.state('listContacts', {
    url: '/',
    templateUrl: '/views/contacts.client.view.html'
  })
}]);
