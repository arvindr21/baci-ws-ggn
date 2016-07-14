var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var jshint = require('gulp-jshint');

gulp.task('default', function() {
    gulp.src('src/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist'))
});

gulp.task('lint', function() {
    return gulp.src('./js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});	

gulp.task('watch', function() {
    gulp.watch('./js/*.js', ['lint']);
    gulp.watch('./xyz/*', ['default']);
    gulp.watch('./js/*.js', ['default']);
});
