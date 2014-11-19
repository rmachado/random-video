'use strict';

var path = require('path'),
    fs   = require('fs'),
    _    = require('underscore');

var config = require('./config');

var staticPath = path.resolve(config.videos_path);

module.exports.index = function(req, res){
  res.render('index', {});
};

module.exports.video = function(req, res){
  var season = req.params[0];
  var episode = req.params[1];

  var fileName = config.video_format
    .replace('{season}', season)
    .replace('{episode}', episode);
  fileName += '.' + config.video_type;

  var filePath = path.join(staticPath, season, fileName);
  if(!fs.existsSync(filePath)){
    res.status(404).send('Not Found');
    return;
  }

  var context = {
    season  : season,
    episode : episode,
    type    : config.video_type,
    url : ['/videos', season, fileName].join('/')
  };

  res.render('video', context);
};

module.exports.random = function(req, res){
  var currPath = path.resolve(staticPath);
  var season, episode;

  // Selecciona una carpeta al azar
  fs.readdir(currPath, function(err, folders){
    folders = _.filter(folders, function(f){
      var full = path.join(currPath, f);
      return f.match(/\d+/) && fs.statSync(full).isDirectory();
    });

    var r = Math.floor(Math.random() * folders.length);
    season = folders[r];
    currPath = path.join(currPath, season);

    // Selecciona un episodio al azar
    var extRegExp = '.*\\.' + config.video_type + '$';
    fs.readdir(currPath, function(err, files){
      files = _.filter(files, function(f){ return f.match(extRegExp); });

      r = Math.floor(Math.random() * files.length);

      var fileRegExp = config.video_format.replace('{episode}', '(\\d+)');
      episode = files[r].match(fileRegExp)[1];

      res.redirect('/' + season + '/' + episode);
    });
  });
};
