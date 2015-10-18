// Gulp.js configuration

// include gulp and plugins
var fs = require("fs"),
	gulp = require('gulp'),
	newer = require('gulp-newer'),
	concat = require('gulp-concat'),
	preprocess = require('gulp-preprocess'),
	htmlclean = require('gulp-htmlclean'),
	imagemin = require('gulp-imagemin'),
	imacss = require('gulp-imacss'),
	sass = require('gulp-sass'),
	pleeease = require('gulp-pleeease'),
	jshint = require('gulp-jshint'),
	deporder = require('gulp-deporder'),
	stripdebug = require('gulp-strip-debug'),
	uglify = require('gulp-uglify'),
	size = require('gulp-size'),
	del = require('del'),
	ngAnnotate = require('gulp-ng-annotate'),
	sourcemaps = require('gulp-sourcemaps'),
	browsersync = require('browser-sync'),
	pkg = require('./package.json'),
	config = require('./build-config.json');




process.env.NODE_ENV = 'production';
// file locations
var
	devBuild = ((process.env.NODE_ENV || 'development').trim().toLowerCase() !== 'production'),

	source = 'public/',
	dest = 'build/',

	html = {
		in: source + '*.html',
		watch: [source + '*.html', source + 'views/**/*'],
		out: dest,
		context: {
			devBuild: devBuild,
			author: pkg.author,
			version: pkg.version
		}
	},

	images = {
		in: source + 'images/*.*',
		out: dest + 'images/'
	},

	imguri = {
		in: source + 'images/inline/*',
		out: source + 'scss/images/',
		filename: '_datauri.scss',
		namespace: 'img'
	},

	css = {
		in: source + 'scss/main.scss',
		watch: [source + 'scss/**/*', '!' + imguri.out + imguri.filename],
		out: dest + 'css/',
		sassOpts: {
			outputStyle: 'nested', // compressed
			imagePath: '../images',
			precision: 3,
			errLogToConsole: true
		},
		pleeeaseOpts: {
			autoprefixer: { browsers: ['last 2 versions', '> 2%'] },
			rem: ['16px'],
			pseudoElements: true,
			mqpacker: true,
			minifier: !devBuild
		}
	},

	fonts = {
		in: source + 'fonts/*.*',
		out: css.out + 'fonts/'
	},

	js = {
		in: source + 'js/**/*',
		out: dest + 'js/',
		filename: 'main.min.js',
		vendor: source + 'vendor/'
	},
	vendor ={
		in: source + 'vendor/**/*',
		out: dest + 'vendor/'
	},

	syncOpts = {
		server: {
			baseDir: dest,
			index: 'index.html'
		},
		open: false,
		notify: true
	};

    function getFilesList() {
        var jsFiles = [],
        	indexContents,
            scriptTagsPattern,
            match;

        // if (!grunt.file.exists(indexPath)) {
        //     grunt.log.warn('Index file "' + indexPath + '" not found.');
        //     return false;
        // }

		indexContents = fs.readFileSync(source+'templates/_scripts.html');
        scriptTagsPattern = /<script.+?src="(.+?)".*?><\/script>/gm;
        match = scriptTagsPattern.exec(indexContents);
        while (match) {
            // if (!(/livereload-setup\.js/.test(match[1]))) {
            jsFiles.push(source + match[1]);
            // }
            match = scriptTagsPattern.exec(indexContents);
        } 
        jsFiles.pop(); // remove production script `main.min.js` 
        return  jsFiles;
    }



// show build type
console.log(pkg.name + ' ' + pkg.version + ', ' + (devBuild ? 'development' : 'production') + ' build');

// clean the build folder
gulp.task('clean', function() {
	del([
		dest + '*'
	]);
});

// build HTML files
gulp.task('html', function() {
	var page = gulp.src(html.in).pipe(preprocess({ context: html.context }));
	if (!devBuild) {
		page = page
			.pipe(size({ title: 'HTML in' }))
			.pipe(htmlclean())
			.pipe(size({ title: 'HTML out' }));
	}
	return page.pipe(gulp.dest(html.out));
});

// manage images
gulp.task('images', function() {
	return gulp.src(images.in)
		.pipe(newer(images.out))
		.pipe(imagemin())
		.pipe(gulp.dest(images.out));
});

// convert inline images to dataURIs in SCSS source
gulp.task('imguri', function() {
	return gulp.src(imguri.in)
		.pipe(imagemin())
		.pipe(imacss(imguri.filename, imguri.namespace))
		.pipe(gulp.dest(imguri.out));
});

// copy fonts
gulp.task('fonts', function() {
	return gulp.src(fonts.in)
		.pipe(newer(fonts.out))
		.pipe(gulp.dest(fonts.out));
});


// compile Sass
gulp.task('sass', ['imguri'], function() {
	return gulp.src(css.in)
		.pipe(sourcemaps.init())
		.pipe(sass(css.sassOpts))
		.pipe(sourcemaps.write())
		// .pipe(size({title: 'CSS in '}))
		// .pipe(pleeease(css.pleeeaseOpts))
		// .pipe(size({title: 'CSS out '}))
		.pipe(gulp.dest(css.out))
		.pipe(browsersync.reload({ stream: true }));
});

gulp.task('js', function() {
	if (devBuild) {

		return gulp.src(js.in)
			.pipe(newer(js.out))
			.pipe(jshint())
			.pipe(jshint.reporter('default'))
			.pipe(jshint.reporter('fail'))
			.pipe(gulp.dest(js.out));
	}
	else {
		del([
			dest + 'js/*'
		]);
		return gulp.src(getFilesList())
			//.pipe(deporder())
			.pipe(concat(js.filename))
			.pipe(ngAnnotate({
			    add: true,
			    single_quotes: true
			}))
			.pipe(size({ title: 'JS in '}))
			.pipe(stripdebug())
			.pipe(uglify())
			.pipe(size({ title: 'JS out '}))
			.pipe(gulp.dest(js.out));
	}
});


gulp.task('copy', function(){
  // the base option sets the relative root for the set of files,
  // preserving the folder structure
  if(devBuild){
	  gulp.src(config.filesToCopy, { base: source })
	  .pipe(gulp.dest(dest)); 	
  } else {
  	// copy fonts
  	gulp.src(config.filesToCopy[1], { base: source })
	  .pipe(gulp.dest(dest));
	// copy views
  	gulp.src(config.filesToCopy[3], { base: source })
	  .pipe(gulp.dest(dest));
  }
});


// browser sync
gulp.task('browsersync', function() {
	browsersync(syncOpts);
});

// default task
gulp.task('default', ['html', 'images', 'fonts', 'sass', 'js', 'browsersync', 'copy'], function() {

	// html changes
	gulp.watch(html.watch, ['html', browsersync.reload]);

	// image changes
	gulp.watch(images.in, ['images']);

	// font changes
	gulp.watch(fonts.in, ['fonts']);

	// sass changes
	gulp.watch([css.watch, imguri.in], ['sass']);

	// javascript changes
	gulp.watch(js.in, ['js', browsersync.reload]);

});
