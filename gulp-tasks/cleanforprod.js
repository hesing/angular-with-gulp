var config = require('./config');
var del = require('del');

module.exports = function(gulp) {
    gulp.task('cleanforprod', function() {
        del([
            config.dest + 'templates/'
        ]);
    });
};
