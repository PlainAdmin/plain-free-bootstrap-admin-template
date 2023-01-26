
const gulp = require('gulp');
const { src, dest, watch, series } = require('gulp');

const sass = require("gulp-sass")(require("sass"))

const browserSync = require('browser-sync').create();

// Sass Task
function scssTask() {
  return src('assets/scss/*.scss')
  .pipe(sass())
  .pipe(gulp.dest('assets/css/'))
}

// BrowserSync Task 
function browserSyncServer(cb) {
  browserSync.init({
    server: {
      baseDir: '.'
    }
  })
  cb();
}

function browserSyncReload(cb) {
  browserSync.reload();
  cb();
}

// Watch Task
function watchTask() {
  watch(['*.html', 'assets/js/**/*.js'], browserSyncReload);
  watch(['assets/scss/**/*.scss'], series(scssTask, browserSyncReload));
}


exports.default = series (
  scssTask,
  browserSyncServer,
  watchTask
);