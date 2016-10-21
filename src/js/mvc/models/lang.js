'use strict';

define(['backbone'], (Backbone) => {
  return Backbone.Model.extend({
    url: '/language/:id'
  });
});