'use strict';
 var gulp = require('gulp'),
      concat = require('gulp-concat'),
      uglify = require('gulp-uglify'),
      rename = require('gulp-rename'),
        sass = require('gulp-sass'),
        maps = require('gulp-sourcemaps'),
       gutil = require('gulp-util'),
    cleanCss = require('gulp-clean-css'),
autoprefixer = require('gulp-autoprefixer'),
    imagemin = require('gulp-imagemin'),
         del = require('del'),
       serve = require('gulp-serve');

/* Run the gulp scripts command at the command line to concatenate, minify, and copy all of the project’s JavaScript files into an all.min.js file that is then copied to the dist/scripts folder. */

gulp.task('scripts',['clean'],()=>{
      return gulp.src(['js/**/*.js'])
      .pipe(maps.init())
      .pipe(concat('all.js'))
      .pipe(uglify())
      .pipe(rename('all.min.js'))
      .pipe(maps.write('./'))
      .pipe(gulp.dest('dist/scripts'));
});

/* Run the gulp styles command at the command line to compile the project’s SCSS files into CSS, then concatenate and minify into an all.min.css file that is then copied to the dist/styles folder. */

gulp.task('styles',['clean'],()=>{
  return gulp.src(['sass/**/**.scss'])
  .pipe(maps.init())
  .pipe(concat('all.css'))
  .pipe(sass())
  .pipe(cleanCss())
  .pipe(rename('all.min.css'))
  .pipe(maps.write('./'))    
  .pipe(gulp.dest('dist/styles'));
});

/* Run the gulp scripts or gulp styles commands at the command line, source maps are generated for the JavaScript and CSS files respectively. */

/* Run the gulp images command at the command line to optimize the size of the project’s JPEG and PNG files, and then copy those optimized images to the dist/content folder.*/

gulp.task('images',['clean'],()=>{
    return gulp.src('images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/content'))
});

/* Run the gulp clean command at the command line to delete all of the files and folders in the dist folder. */

gulp.task('clean',()=>{
    return del(['dist']);
});

/* Run the gulp build command at the command line to run the clean, scripts, styles, and images tasks with confidence that the clean task completes before the other commands.*/

gulp.task('build',['scripts','styles','images']);

/* Run the gulp command at the command line to run the build task and serve my project using a local web server.*/

/* default task workflow clean -> scripts,styles,images -> server */



gulp.task('default',['build'],serve({
  port: 3000,
  hostname: 'localhost',
    })
);
          