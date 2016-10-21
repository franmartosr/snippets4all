'use strict';

define(['backbone'], (Backbone) => {
  return Backbone.Collection.extend({
    url: '/langs'
  });
});