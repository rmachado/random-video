'use strict';

var ctrl = require('./controller');

module.exports = function(app){

  app.get('/', ctrl.index);

  app.get(/\/(\d+)\/(\d+)/, ctrl.video);

  app.get('/random', ctrl.random);
};
