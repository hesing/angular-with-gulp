var config = require('./config');
var newer = require('gulp-newer');
var imagemin = require('gulp-imagemin');

module.exports = function(gulp) {
    gulp.task('images', function() {
        return gulp.src(config.images.in)
            .pipe(newer(config.images.out))
            .pipe(imagemin())
            .pipe(gulp.dest(config.images.out));
    });
};
