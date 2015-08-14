var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var browserSync = require('browser-sync');

gulp.task('browserify', function() {
  browserify('./app.js')
    .transform(babelify)
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.reload({ stream: true, once: true }));
});

gulp.task('browserSync', function() {
  browserSync({
    server: '.'
  });
});

gulp.task('watch', function() {
  gulp.watch('*.js', ['browserify']);
});

gulp.task('default', ['browserify', 'browserSync', 'watch']);
