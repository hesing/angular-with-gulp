var config = require('./config');
var sourcemaps = require('gulp-sourcemaps');
var compass = require('gulp-compass');
var browsersync = require('browser-sync');
var notify = require('gulp-notify');
var size = require('gulp-size');
var pleeease = require('gulp-pleeease');

module.exports = function(gulp) {
    gulp.task('compass', function() {
        if (!config.devBuild) {
            config.css.compassOpts.style = 'compressed';
            config.css.compassOpts.sourcemap = false;
        }
        return gulp.src(config.css.in)
            //.pipe(sourcemaps.init())
            .pipe(compass(config.css.compassOpts))
            .on('error', notify.onError(function(error) {
                return 'An error occurred while compiling sass.\nLook in the console for details.\n' + error;
            }))
            //.pipe(sourcemaps.write())
            .pipe(size({ title: 'CSS in ' }))
            .pipe(pleeease(config.css.pleeeaseOpts))
            .pipe(size({ title: 'CSS out ' }))
            .pipe(gulp.dest(config.css.out))
            .pipe(notify({
                message: 'Compilation Successful'
            }))
            .pipe(browsersync.reload({ stream: true }));
    });
};
