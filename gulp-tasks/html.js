var config = require('./config');
var preprocess = require('gulp-preprocess');
var size = require('gulp-size');
var htmlclean = require('gulp-htmlclean');

module.exports = function(gulp){
	gulp.task('html', function() {
		var page = gulp.src(config.html.in)
			.pipe(preprocess({ context: config.html.context }));

		if (!config.devBuild) {
			page = page
				.pipe(size({ title: 'HTML in' }))
				.pipe(htmlclean())
				.pipe(size({ title: 'HTML out' }));
		}
		return page.pipe(gulp.dest(config.html.out));
	}); 
};