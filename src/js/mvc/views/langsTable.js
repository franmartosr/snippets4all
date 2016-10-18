define([
  'backbone',
  '/js/mvc/collections/langs.js',
  'text!/tmpl/langsTable.html'
], function (Backbone, collection, tmpl) {
  'use strict';

  return Backbone.View.extend({
    collection: new collection(),
    el: '#mainContent',
    events: {},
    template: _.template(tmpl),
    initialize: function() {
      this.collection.fetch({
        success: function() {
          this.model = this.collection.models;
          this.render();
        }.bind(this)
      });
    },
    render: function() {
      this.$el.html(_.template(this.template({ data: this.model })));
    }
  });
});