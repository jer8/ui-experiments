const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const minifyHtml = require('gulp-minify-html');
const minifyCss = require("gulp-minify-css");

function handleError(error) {
  console.log(error.toString());
  this.emit('end');
}

gulp.task('browserSync', function(){
  //https://github.com/BrowserSync/browser-sync/issues/125
  browserSync.init({
    startPath:'./pages',
    server: {
      baseDir: 'application/dist',
    },
  });
});

gulp.task('css-build', function(){
  return gulp.src('application/scss/**/*.scss')
    .pipe(sass()) // Converts Sass to CSS with gulp-sass
    .pipe(minifyCss())
    .on('error', handleError)
    .pipe(gulp.dest('application/dist/css'))
    //The reload method will inform all browsers about changed files and will either cause the browser to refresh, or inject the files where possible.
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('html-build', function(){
  return gulp.src('application/pages/**/*.html')
    .pipe(minifyHtml())
    .on('error', handleError)
    .pipe(gulp.dest('application/dist/pages'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('copy-assets', function(){
  console.log('assetsss');
  return gulp.src('application/images/*.*')
    .pipe(gulp.dest('application/dist/images'))
});

gulp.task('watch',['browserSync','css-build','html-build','copy-assets'], function(){
  gulp.watch('application/scss/**/*.scss', ['css-build']);
  gulp.watch('application/pages/*.html', ['html-build']);
});
