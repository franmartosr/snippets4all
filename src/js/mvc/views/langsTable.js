'use strict';

define([
  'backbone',
  '/js/mvc/collections/langs.js',
  'text!/tmpl/langsTable.html'
], (Backbone, Collection, tmpl) => {
  return Backbone.View.extend({
    collection: new Collection(),
    el: '#mainContent',
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
      this.$el.html(this.template({ data: this.model }));
    }
  });
});