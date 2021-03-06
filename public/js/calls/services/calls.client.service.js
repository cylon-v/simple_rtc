'use strict';

angular.module('calls').factory('Calls', ['$resource',
  function($resource) {
    return $resource('calls/:id', {
      id: '@id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);
