'use strict';

define([
  'backbone',
  '/js/mvc/models/lang.js',
  'text!/tmpl/singleLang.html'
], (Backbone, Model, tmpl) => {
  return Backbone.View.extend({
    el: '#mainContent',
    model: new Model(),
    template: _.template(tmpl),
    initialize: function(params) {
      this.model.url = `language/${params.language}`;
      this.model.fetch({
        success: function() {
          this.render();
        }.bind(this)
      });
    },
    render: function() {
      this.$el.html(this.template({ data: this.model.attributes }));
    }
  });
});