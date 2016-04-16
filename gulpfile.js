var gulp = require('gulp');
var config = require('./gulp-tasks/config');
var browsersync = require('browser-sync');
var del = require('del');

// clean the build folder
require('./gulp-tasks/clean')(gulp);

// build HTML files
require('./gulp-tasks/html')(gulp);

// manage image optimization
require('./gulp-tasks/images')(gulp);

// compass
require('./gulp-tasks/compass')(gulp);

// compile Sass
require('./gulp-tasks/sass')(gulp);

// components Sass
require('./gulp-tasks/componentsSass')(gulp);

// scripts optimization
require('./gulp-tasks/scripts')(gulp);

// componentsJS optimization
require('./gulp-tasks/componentsJS')(gulp);

// copy static files ( fonts, views, favicon.ico etc )
require('./gulp-tasks/copy')(gulp);

// browser sync
require('./gulp-tasks/browsersync')(gulp);

// cleaning ( templates) for production build
require('./gulp-tasks/cleanforprod')(gulp);


// default task
gulp.task('default', ['html', 'images', 'sass', 'scripts', 'browsersync', 'copy'], function() {
    // html changes
    gulp.watch(config.html.watch, ['html', browsersync.reload]);

    // sass changes
    gulp.watch(config.css.watch, ['sass']);

    // javascript changes
    gulp.watch(config.js.in, ['scripts', browsersync.reload]);

    if (!config.devBuild) {
        del([
            config.dest + 'vendor/'
        ], { force: true });
    }

    del([
        config.dest + 'templates/'
    ], { force: true });
});
