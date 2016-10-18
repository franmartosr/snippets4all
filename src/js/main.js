/* eslint-disable strict */
'use strict'; // jshint ignore:line
/* eslint-enable strict */

requirejs.config({
  baseUrl: 'src',
  paths: {
    //Vendor libs
    backbone: '/js/libs/backbone-1.3.3',
    jQuery: '/js/libs/jquery-3.0.0',
    text: '/js/libs/require-text',
    underscore: '/js/libs/underscore-1.8.3'
  },
  shim: {
    backbone: {
      deps: ['jQuery', 'underscore'],
      exports: 'Backbone'
    },
    jQuery: {
      exports: '$'
    },
    underscore: {
      exports: '_'
    }
  }
});

requirejs(['/js/mvc/router.js']);