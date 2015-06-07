'use strict';

angular.module('calls').factory('Contacts', ['$resource',
  function($resource) {
    return $resource('contacts/:contactId', {
      contactId: '@id'
    });
  }
]);
