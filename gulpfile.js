var gulp = require('gulp');
var ghPages = require('gulp-gh-pages');
var browserSync = require('browser-sync');

gulp.task('server', function () {
  browserSync({
    port: 8888,
    server: {
      baseDir: "./app"
    },
    ghostMode: false,
    notify: false,
    scrollProportionally: false,
    browser: "google chrome"
  });
});

gulp.task('reload', function () {
  browserSync.reload();
});

gulp.task('ghPages', function () {
  var remoteUrl = require('./package.json').repository.url;

  return gulp.src('./app/**/*')
    .pipe(ghPages({remoteUrl: remoteUrl}));
});

gulp.task('default', ['server'], function () {
  gulp.watch(['./app/**/*'], ['reload']);
});
