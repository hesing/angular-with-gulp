var config = require('./config');

module.exports = function(gulp) {
    gulp.task('copy', function() {
        // the base option sets the relative root for the set of files,
        // preserving the folder structure
        if (config.devBuild) {
            gulp.src(config.filesToCopy, { base: config.source })
                .pipe(gulp.dest(config.dest));
        } else {
            // copy fonts only in prod, images already copied with images task
            gulp.src(config.filesToCopy[0], { base: config.source })
                .pipe(gulp.dest(config.dest));
        }
    });
};

