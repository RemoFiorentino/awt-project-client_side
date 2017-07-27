/*jslint node: true */
"use strict";

var gulp = require('gulp'),
    rimraf = require('gulp-rimraf'),
    rename = require('gulp-rename'),
    minifyCss = require('gulp-cssnano'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    minifyjs = require('gulp-uglify'),
    merge = require('merge-stream'),
    imagemin = require('gulp-imagemin'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    haml = require('gulp-ruby-haml');

gulp.task('clean', function () {
    return gulp.src('./www/*', {read: false}).pipe(rimraf({ force: true}));
});

gulp.task('html', function () {
    return gulp.src('./src/index.html').pipe(gulp.dest('./www'));
});
gulp.task('html:watch', function () {
  gulp.watch('./src/index.html', ['html']);
});

gulp.task('haml', function () {
    return gulp.src('./src/js/**/*.haml')
    .pipe(haml().on('error', function(e) { console.log(e.message); }))
    .pipe(gulp.dest(function (file) {
        return file.base;
    }));
});

gulp.task('font', function () {
    return gulp.src(['./node_modules/bootstrap/dist/fonts/glyphicons-halflings-regular.eot','./node_modules/bootstrap/dist/fonts/glyphicons-halflings-regular.svg','./node_modules/bootstrap/dist/fonts/glyphicons-halflings-regular.ttf','./node_modules/bootstrap/dist/fonts/glyphicons-halflings-regular.woff','./node_modules/bootstrap/dist/fonts/glyphicons-halflings-regular.woff2'])
    .pipe(gulp.dest('./www/fonts/bootstrap'))
});

gulp.task('vendor', function () {
    return merge(
        gulp.src([
            './node_modules/bootstrap/dist/js/bootstrap.min.js',
            './node_modules/jquery/dist/jquery.min.js',
            './node_modules/nedb/browser-version/out/nedb.min.js',
            './node_modules/bluebird/js/browser/bluebird.min.js'
        ]).pipe(gulp.dest('./www/js')),
        gulp.src('./node_modules/knockout/build/output/knockout-latest.js')
            .pipe(rename('knockout.min.js'))
            .pipe(gulp.dest('./www/js'))
    );
});

gulp.task('js', function () {
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
        .bundle()
        .pipe(source('index.js'))
        .pipe(buffer())
        //.pipe(minifyjs()) // uncomment for production
        .pipe(gulp.dest('./www/js'));
});

gulp.task('js:watch', function () {
  gulp.watch('./src/js/**/*.js', ['js']);
  gulp.watch('./src/js/**/*.html', ['js']);
  gulp.watch('./src/js/**/*.haml', ['haml','js']);
});

gulp.task('bootstrap', function () {
  return gulp.src('./node_modules/bootstrap-sass/assets/stylesheets/_bootstrap.scss')
    .pipe(concat('bootstrap.scss')) 
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./www/css'));
});

gulp.task('sass', function () {
  return gulp.src('./src/scss/*.scss')
    .pipe(concat('app.scss')) 
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./www/css'));
});
 
gulp.task('sass:watch', function () {
  gulp.watch('./src/scss/**/*.scss', ['sass']);
});

gulp.task('image', function () {
    return gulp.src('./src/img/**/*')
    .pipe(imagemin({
      progressive: true
    }))
    .pipe(gulp.dest('./www/images'));
});

gulp.task('image:watch', function () {
  gulp.watch('.src/img/**/*', ['image']);
});

gulp.task('build', ['html', 'haml', 'bootstrap', 'js', 'vendor', 'image', 'sass', 'html:watch', 'sass:watch', 'js:watch', 'vendor', 'image:watch', 'font']);

gulp.task('default', ['clean'], function () {
    return gulp.start('build');
});


