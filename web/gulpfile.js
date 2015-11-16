var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync');
var reload = browserSync.reload;

gulp.task('scss', ['cleancss'], function() {
	return gulp
		.src('scss/**/*.scss')
		.pipe($.sourcemaps.init())
		.pipe($.sass({
			outputStyle: 'compressed',
			onError: console.error.bind(console, 'Sass error:')
		}))
		.pipe(autoprefixer())
		.pipe($.sourcemaps.write())
		.pipe(gulp.dest('css'))
		.pipe(reload({
			stream: true
		}));
});

gulp.task('es6', ['cleanjs'], function() {
	return gulp
		.src('es6/**/*.es6')
		.pipe($.sourcemaps.init())
        .pipe($.babel({
            presets: ['es2015']
        }))
		.pipe($.sourcemaps.write())
		.pipe(gulp.dest('js'))
		.on('end', reload);
});

gulp.task('buildcss', ['scss'], function() {
	return gulp
		.src('css/*.css')
		.pipe($.uglifycss())
		.pipe(gulp.dest('css'));
});

gulp.task('buildjs', ['es6'], function() {
	return gulp
		.src('js/*.js')
		.pipe($.uglify())
		.pipe(gulp.dest('js'));
});

gulp.task('build', ['buildcss', 'buildjs']);

gulp.task('cleancss', require('del').bind(null, ['css/*.css']));

gulp.task('cleanjs', require('del').bind(null, ['js/*.js']));

gulp.task('clean', ['cleancss', 'cleanjs']);

gulp.task('clear', function(done) {
	$.cache.clearAll(done);
});

gulp.task('watch', ['scss', 'es6'], function() {
	browserSync({
		notify: false,
		port: 9000,
		proxy: 'localhost.invoice.scripti.st'
	});

	gulp.watch(['twig/**/*.html.twig']).on('change', reload);
	gulp.watch('scss/**/*.scss', ['scss']);
	gulp.watch('es6/**/*.es6', ['es6']);
});

gulp.task('default', ['watch']);
