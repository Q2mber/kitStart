var gulp = require('gulp'),
    livereload = require('gulp-livereload'),
    autoprefixer = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    stylus = require('gulp-stylus'),
    browserify = require('browserify'),
    vinylSource = require('vinyl-source-stream'),
    es = require('event-stream'),
    plumber = require('gulp-plumber'),
    jade = require('gulp-jade'),
    mainBowerFiles = require('main-bower-files'),
    gulpFilter = require('gulp-filter');

var sourceFile = './app/bootstrap.js',
    destFolder = './public/',
    destFile = 'combained.js';


gulp.task('css', function () {
    var cssFilter = gulpFilter(['**/*.css']);
    var vendor = gulp.src(mainBowerFiles()).pipe(cssFilter)

    var bundle = gulp.src('app/views/css/main.styl')
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

    return es.merge(vendor, bundle)
        .pipe(concat('combained.css'))
        .pipe(gulp.dest(destFolder + '/css'))
})


gulp.task('vendor', function () {
    var jsFilter = gulpFilter(['**/*.js','**/**/*.js','**/**/**/*.js']);
    return gulp.src(mainBowerFiles()).pipe(jsFilter)
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest(destFolder + '/js'))
});

gulp.task('js', function () {
    console.log("browserify it");
    return browserify(sourceFile)
        .bundle().on('error', function (e) {
            console.log(e.toString())
            this.emit('end');
        })
        .pipe(vinylSource(destFile))
        .pipe(gulp.dest(destFolder+'/js'))
})


gulp.task('jade', function () {
    var YOUR_LOCALS = {};

    gulp.src('./app/views/*.jade')
        .pipe(jade({
            locals: YOUR_LOCALS
        }))
        .pipe(gulp.dest(destFolder + '/html'))
});


gulp.task('dev',['vendor','js','jade','css'], function () {
    livereload.listen();

    //JADE
    gulp.watch([
            './app/views/*.jade',
            './app/views/**/*.jade',
            './app/views/**/**/*.jade'
        ], ['jade'],
        function (e) {
        }).on('change', livereload.changed);

    //JS
    gulp.watch([
            './app/*.js',
            './app/**/*.js',
            './app/**/**/ *.js'
        ], ['vendor','js'],
        function (e) {
        })
        .on('change', livereload.changed);

    //CSS
    gulp.watch([
        './app/views/css/*.styl',
        './app/views/css/**/*.styl',
        './app/views/css/**/**/ *.styl'
    ], ['css'], function (e) {
    }).on('change', livereload.changed);

})
