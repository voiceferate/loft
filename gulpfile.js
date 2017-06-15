var gulp        = require('gulp');
var fileinclude = require('gulp-file-include');
var browserSync = require('browser-sync');
var concatCss	  = require('gulp-concat-css');
var cssnano		  = require('gulp-cssnano');
var rename		  = require('gulp-rename');


var paths = {
  css:['app/css/*.css'],
  html:['app/html/*.html', 'app/html/components/*.html']
};


gulp.task('fileinclude', function() {
  return gulp.src(['app/html/*.html'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: 'app/html/components'
    }))
    .pipe(gulp.dest('dist/'))
    .pipe(browserSync.reload({stream: true}));
});


gulp.task('concatCss', function () {
  return gulp.src('app/css/*.css')
    .pipe(concatCss("main.css"))
	.pipe(cssnano())
	.pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('dist/css/'))
    .pipe(browserSync.reload({stream: true}));
});


gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'dist'
		}
	});
});


gulp.task('watch', ['browser-sync', 'concatCss', 'fileinclude'], function() {
	gulp.watch(paths.css, ['concatCss']);
	gulp.watch(paths.html, ['fileinclude', browserSync.reload]);
});