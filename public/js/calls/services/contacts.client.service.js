'use strict';

angular.module('calls').factory('Contacts', ['$resource',
  function($resource) {
    return $resource('contacts/:id', {
      id: '@id'
    }, {
      call: {
        method: 'PUT',
        url: '/contacts/:id/call'
      }
    });
  }
]);
