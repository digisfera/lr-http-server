var connect = require('connect'),
    path = require('path'),
    gaze = require('gaze'),
    open = require('open'),
    tinylr = require('tiny-lr');



module.exports = function(port, dir, livereloadPort, watchFiles, openBrowser) {

  port = port || 8080;
  dir = dir || '.';

  if(livereloadPort === 'false' || livereloadPort === false)
    livereloadPort = false;
  else
    livereloadPort = livereloadPort || 35729;

  watchFiles = watchFiles || [ '**/*.html', '**/*.js', '**/*.css', '**/*.xml' ];


  absoluteDir = path.resolve(dir);

  var absoluteWatchFiles = watchFiles.map(function(relativePath) {
    return path.join(absoluteDir, relativePath);
  });


  var server = connect();

                
  if(livereloadPort) {
    server.use(require('connect-livereload')({ port: livereloadPort }));

    var livereloadServer = tinylr();

    livereloadServer.listen(livereloadPort, function(err) {
      if(err) {
        console.error("Livereload not started", err);
        return;
      }

      console.log('Livereload listening on port %s', livereloadPort);

      console.log("Watching files:");
      for(var f in absoluteWatchFiles) {
        console.log('  ' + absoluteWatchFiles[f]);
      }
    });


    gaze(absoluteWatchFiles, function(err, watcher) {
      if(err) {
        console.error("Unable to watch files", err);
      }
      this.on('all', function(event, filepath) {
        livereloadServer.changed({body:{files:filepath}});
      });
    });
  }

  server.use(connect.static(absoluteDir))
        .use(connect.directory(absoluteDir))
        .listen(port);

  console.log("HTTP server listening on port " + port + "\nServing " + absoluteDir);

  if(openBrowser) { open("http://127.0.0.1:" + port); }

};