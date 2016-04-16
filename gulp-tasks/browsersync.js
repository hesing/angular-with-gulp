var config = require('./config');
var browsersync = require('browser-sync');

module.exports = function(gulp) {
    gulp.task('browsersync', function() {
        browsersync(config.syncOpts);
    });
};

