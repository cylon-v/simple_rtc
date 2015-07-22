'use strict';

angular.module('calls').factory('Records', ['$resource',
  function($resource) {
    return $resource('records/:id', {
      id: '@id'
    }, {
      update: {
        method: 'PUT'
      }
    }, {
      finish: {
        method: 'PUT',
        url: 'records/:id/finish'
      }
    });
  }
]);
