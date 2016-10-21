/* eslint-disable no-new */
'use strict';

define(['backbone'], function (Backbone) {
  const Router = Backbone.Router.extend({
    routes: {
      '': 'main',
      'language/:lang': 'paintLang'
  	},
    main: function() {
      require(['/js/mvc/views/langsTable.js'], function(LangsTableView) {
        new LangsTableView();
      });
    },
    paintLang: function(lang) {
      require(['/js/mvc/views/singleLang.js'], function(SingleLangView) {
        new SingleLangView({ language: lang });
      });
    }
  });

  new Router();
  Backbone.history.start();
});