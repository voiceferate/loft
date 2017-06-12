var gulp        = require('gulp');
var rigger 		= require('gulp-rigger');
var browserSync = require('browser-sync');
var concatCss	= require('gulp-concat-css');
var cssnano		= require('gulp-cssnano');
var rename		= require('gulp-rename');


var paths = {
  css:['app/css/*.css', 'app/css/page_element_styles/*.css'],
  html:['app/html/*.html']
};


gulp.task('rigger', function () {
    gulp.src('app/html/index.html')
        .pipe(rigger())
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


gulp.task('watch', ['browser-sync', 'concatCss', 'rigger'], function() {
	gulp.watch(paths.css, ['concatCss']);
	gulp.watch(paths.html, ['rigger', browserSync.reload]);
});