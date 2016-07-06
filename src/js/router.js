define(['backbone'], function (Backbone) {
  'use strict';

  var Router = Backbone.Router.extend({});

  var Routes = new Router();
  Backbone.history.start();
});