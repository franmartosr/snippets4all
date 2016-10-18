define(['backbone'], function (Backbone) {
  'use strict';

  return Backbone.Model.extend({
    url: '/language/:id'
  });
});