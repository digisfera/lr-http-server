# lr-http-server

An HTTP server with livereload included. If a file inside the folder being served is changed, added or deleted, the browser will automatically reload.

## Installing

    npm install -g lr-http-server

## Usage

    lr-http-server [-p <port>] [-d <dir>] [-l livereloadport] [-w < watchPaths || false >] [-b]

**port** (default _8080_): Port to listen on

**dir** (default _._): Folder to serve

**url** (default _empty_): Path to open the specific page. _e.g._ `/#/main`

**livereloadport** (default _35729_): Port for the livereload server. If `false` the livereload is disabled.

**watchPaths**: Comma-separated list of glob patterns for the files to watch. _e.g._ `**/*.js,**/*.css,**/*.html,**/*.xml`

**b**: disable browser open

## Examples

Default usage

    > lr-http-server

    HTTP server listening on port 8080
    Serving <path>
    Livereload listening on port 35729
    Watching files:
      '<path>/**/*.html'
      '<path>/**/*.js'
      '<path>/**/*.css'
      '<path>/**/*.xml'

All options

    > lr-http-server -p 80 -d src/ -u /#/main -l 30000 -w **/*.css,*.html

    HTTP server listening on port 80
    Serving <path>/src
    Open page in browser <path>/src/#/main
    Livereload listening on port 30000
    Watching files:
      <path>/src/**/*.css
      <path>/src/*.html
