requirejs.config({
  baseUrl: 'src',
  paths: {
    //Vendor libs
    backbone: 'libs/backbone-1.3.3.min',
    jQuery: 'libs/jquery-3.0.0.min',
    underscore: 'libs/underscore-1.8.3.min'
  },
  shim: {
    'backbone': {
      deps: ['jQuery', 'underscore'],
      exports: 'Backbone'
    },
    'underscore': {
      exports: '_'
    }
  }
});

requirejs(['js/router']);