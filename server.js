'use strict';

var express     = require('express'),
    serveStatic = require('serve-static'),
    hbs         = require('hbs'),
    fs          = require('fs'),
    path        = require('path');

var config = require('./config'),
    routes = require('./routes');

var app = express();

app.set('view engine', 'hbs');

var staticPath = path.resolve(config.videos_path);
app.use('/videos', serveStatic(staticPath));

routes(app);

var port = config.port || 3000;

app.listen(3000, function () {
  console.log('Application listening at port', port);
});
