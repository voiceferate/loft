var gulp        = require('gulp');
var browserSync = require('browser-sync');
var sass		= require('gulp-sass');
var cssnano		= require('gulp-cssnano');
var rename		= require('gulp-rename');
var rigger 		= require('gulp-rigger');


// temp
// var browserSync = require('browser-sync').create();
// var reload      = browserSync.reload;


//шаблони вибірки
	// app/sass.sass  сам файл
	// app/sass/**.*.sass  всі в папці
	// !app/sass/*.sass не цей
	// [('!app/sass.sass'), ('app/sass/**.*.sass')]  можна комбінувати через масив
	// app/sass/*.+(sacc|scss) і то і інше розширення
	// назва файлу з _нижнього підкреслення не береться до уваги


gulp.task('sass', function() {
	return gulp.src('app/sass/*.sass')
	.pipe(sass())
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.reload({stream: true}))
});


gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'dist'
		}
	});
});

gulp.task('css-concat', ['sass'], function() {
	return gulp.src('app/css/main.css')
	.pipe(cssnano())
	.pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest('dist/css'))
});


gulp.task('rigger', function () {
    gulp.src('app/html/index.html')
        .pipe(rigger())
        .pipe(gulp.dest('dist/'));
});

// gulp.task('rigger', function () {
//     gulp.src('app/html/*.html')
//         .pipe(rigger())
//         .pipe(gulp.dest('dist/'));
// });

gulp.task('watch', ['browser-sync', 'css-concat', 'rigger'], function() {
	gulp.watch('app/sass/*.sass', ['sass']);
	gulp.watch('app/html/*.html', browserSync.reload);
});


// gulp.task('html', function(){
//   gulp.src(paths.html)
//   .pipe(reload({stream:true}));
// });

// gulp.task('css', function(){
//   gulp.src(paths.css)
//   .pipe(reload({stream:true}));
// });

// gulp.task('browserSync', function() {
//   browserSync.init({
//     proxy: 'test.local'
//   });
// });

// gulp.task('ivan', function() {
// 	return gulp.src('source-files')
// 	.pipe(plugin())
// 	.pipe(gulp.dest('folder'))//destination

// });


// gulp.task('sass', function () {
//   return gulp.src('./sass/**.scss')
//     .pipe(sass().on('error', sass.logError))
//     .pipe(gulp.dest('./css'));
// });    sass example