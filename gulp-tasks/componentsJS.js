var config = require('./config');
var newer = require('gulp-newer');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var stripdebug = require('gulp-strip-debug');
var ngAnnotate = require('gulp-ng-annotate');
var getFilesList = require('./getFilesList');
var notify = require('gulp-notify');
var del = require('del');
var size = require('gulp-size');

module.exports = function(gulp) {

    gulp.task('componentsJS', function() {
        if (config.devBuild) {
            return gulp.src(config.componentsJS.in)
                .pipe(newer(config.componentsJS.out))
                .pipe(jshint('.jshintrc', { fail: true }))
                .pipe(notify(function(file) {
                    if (file.jshint.success) {
                        // Don't show something if success
                        return "Success";
                    }

                    var errors = file.jshint.results.map(function(data) {
                        if (data.error) {
                            return "(" + data.error.line + ':' + data.error.character + ') ' + data.error.reason;
                        }
                    }).join("\n");
                    return file.relative + " (" + file.jshint.results.length + " errors)\n" + errors;
                }))
                .pipe(jshint.reporter('jshint-stylish'))
            .pipe(gulp.dest(config.componentsJS.out));
        } else {

            return gulp.src(config.componentsJS.in)
                .pipe(ngAnnotate({
                    add: true,
                    single_quotes: true
                }))
                .pipe(stripdebug())
                .pipe(uglify())
                .pipe(gulp.dest(config.componentsJS.out));
        }
    });

};
