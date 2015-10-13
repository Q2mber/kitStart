var gulp = require('gulp'),
	livereload = require('gulp-livereload'),
	autoprefixer = require('gulp-autoprefixer'),
	concat = require('gulp-concat'),
	stylus = require('gulp-stylus'),
	browserify = require('browserify'),
	vinylSource = require('vinyl-source-stream'),
	es = require('event-stream'),
	plumber = require('gulp-plumber');

var sourceFile = './app/bootstrap.js',
	destFolder = './public/',
	destFile = 'combained.js';

gulp.task('css', function () {
	var normalize = gulp.src('bower_components/normalize-css/normalize.css');
	var bundle = gulp.src('app/assets/css/main.styl')
		.pipe(plumber({
			errorHandler: function (e) {
				console.log(e.toString())
				this.emit('end');
			}
		}))
		.pipe(stylus())
		.pipe(autoprefixer({
			browsers: ['last 10 versions']
		}))

	return es.merge(normalize, bundle)
		.pipe(concat('combained.css'))
		.pipe(gulp.dest(destFolder))
})

gulp.task('js', function () {
	console.log("browserify it");
	return browserify(sourceFile)
		.bundle().on('error', function (e) {
			console.log(e.toString())
			this.emit('end');
		})
		.pipe(vinylSource(destFile))
		.pipe(gulp.dest(destFolder))
})




gulp.task('dev', function () {
	livereload.listen();

	//JADE 
	gulp.watch([
		'./app/views/*.jade',
		'./app/views/**/*.jade',
		'./app/views/**/**/*.jade'
	], function (e) {}).on('change', livereload.changed);

	//JS 
	gulp.watch([
		'./app/*.js',
		'./app/**/*.js',
		'./app/**/**/ *.js'
	], ['js'],
		function (e) {})
		.on('change', livereload.changed);

	//CSS 
	gulp.watch([
		'./app/views/css/*.styl',
		'./app/views/css/**/*.styl',
		'./app/views/css/**/**/ *.styl'
	], ['css'], function (e) {}).on('change', livereload.changed);

})
