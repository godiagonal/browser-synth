var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var babelify = require('babelify');
var browserify = require('browserify');
var eslint = require('gulp-eslint');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var watch = require('gulp-watch');

gulp.task('browserify', function () {
    return browserify({
        entries: './src/app.js'
    })
        .transform(babelify)
        .bundle()
        .on('error', function (err) {
            console.error(err);
            this.emit('end');
        })
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./dist'));
});

gulp.task('js', ['browserify'], function () {
    return gulp.src(['./dist/bundle.js'])
        .pipe(uglify())
        .pipe(gulp.dest('./dist/min'));
});

gulp.task('lint', function () {
    return gulp.src(['./src/**/*.js'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failOnError());
});

gulp.task('build', ['browserify']);

gulp.task('watch', function () {
    watch('./src/**/*.js', function () {
        gulp.start('build');
    });
});