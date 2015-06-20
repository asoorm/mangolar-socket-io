var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require("gulp-rename");

gulp
    .task('scripts', runScripts)
    .task('default', ['scripts']);

function runScripts() {
    return gulp.src('src/mangolar-socket-io.js')
        .pipe(gulp.dest('dist'))
	    .pipe(uglify({outSourceMap: true}))
        .pipe(rename("mangolar-socket-io.min.js"))
        .pipe(gulp.dest('dist'));
}
