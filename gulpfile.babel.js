
'use strict';

import plugins    from 'gulp-load-plugins';
import yargs      from 'yargs';
import browser    from 'browser-sync';
import gulp       from 'gulp';
import panini     from 'panini';
import rimraf     from 'rimraf';
import sherpa     from 'style-sherpa';
import yaml       from 'js-yaml';
import fs         from 'fs';
import browserify from 'browserify';
import source     from 'vinyl-source-stream';
import buffer     from 'vinyl-buffer';

// Load all Gulp plugins into one variable
const $ = plugins();

// Check for --production flag
const PRODUCTION = !!(yargs.argv.production);

// Load settings from settings.yml
const { COMPATIBILITY, PORT, UNCSS_OPTIONS, PATHS } = loadConfig();

function loadConfig() {
  let ymlFile = fs.readFileSync('config.yml', 'utf8');
  return yaml.load(ymlFile);
}

// Build the "dist" folder by running all of the below tasks
gulp.task('build',
 gulp.series(clean, gulp.parallel(pages, sass, javascript, images, copy)));

// Build the site, run the server, and watch for file changes
gulp.task('default',
  gulp.series('build', server, watch));

// Delete the "dist" folder
// This happens every time a build starts
function clean(done) {
  rimraf(PATHS.dist, done);
}

// Copy files out of the assets folder
// This task skips over the "img", "js", and "scss" folders, which are parsed separately
function copy() {
  return gulp.src(PATHS.assets)
    .pipe(gulp.dest(PATHS.dist + '/assets'));
}

// Copy page templates into finished HTML files
function pages() {
  return gulp.src('src/**/*.{html,hbs,handlebars}')
    .pipe(gulp.dest(PATHS.dist));
}

// Compile Sass into CSS
// In production, the CSS is compressed
function sass() {
  return gulp.src('src/assets/scss/app.scss')
    .pipe($.sourcemaps.init())
    .pipe($.sass({
      includePaths: PATHS.sass
    })
      .on('error', $.sass.logError))
    .pipe($.autoprefixer({
      browsers: COMPATIBILITY
    }))
    .pipe($.if(PRODUCTION, $.uncss(UNCSS_OPTIONS)))
    .pipe($.if(PRODUCTION, $.cssnano()))
    .pipe($.if(!PRODUCTION, $.sourcemaps.write()))
    .pipe(gulp.dest(PATHS.dist + '/assets'))
    .pipe(browser.reload({ stream: true }));
}

// Combine JavaScript into one file
// In production, the file is minified
function javascript() {
  return browserify({
      entries: './src/js/index.js',
      debug: true
  })
      .transform('exposify', {
          expose: {
              'jquery': '$',
              'knockout': 'ko',
              'nedb': 'Nedb',
              'bluebird': 'Promise'
          }
      })
      .transform('stringify', {
          extensions: ['.html'],
          minify: true,
          minifyOptions: {
              removeComments: false
          }
      })
      .pipe($.sourcemaps.init())
      .pipe($.babel())
      .pipe($.if(PRODUCTION, $.uglify()
        .on('error', e => { console.log(e); })
      ))
      .pipe($.if(!PRODUCTION, $.sourcemaps.write()))
      .bundle()
      .pipe(source('index.js'))
      .pipe(buffer())
      .pipe(gulp.dest(PATHS.dist + '/assets'));
}

gulp.task('js', function () {
   
});

// Copy images to the "dist" folder
// In production, the images are compressed
function images() {
  return gulp.src('src/assets/img/**/*')
    .pipe($.if(PRODUCTION, $.imagemin({
      progressive: true
    })))
    .pipe(gulp.dest(PATHS.dist + '/assets'));
}

// Start a server with BrowserSync to preview the site in
function server(done) {
  browser.init({
    server: PATHS.dist, port: PORT
  });
  done();
}

// Watch for changes to static assets, pages, Sass, and JavaScript
function watch() {
  gulp.watch(PATHS.assets, copy);
  gulp.watch('src/pages/**/*.html', gulp.series(pages, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss', sass);
  gulp.watch('src/assets/js/**/*.js', gulp.series(javascript, browser.reload));
  gulp.watch('src/assets/img/**/*', gulp.series(images, browser.reload));
}
