'use strict';

var app = angular.module('calls', ['ngResource', 'ui.router', 'btford.socket-io']).config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
  $urlRouterProvider.otherwise('/');

  $stateProvider.state('listContacts', {
    url: '/',
    templateUrl: '/views/contacts.client.view.html'
  }).state('call', {
    url: '/call/:id',
    templateUrl: '/views/call.client.view.html'
  })
}]);
