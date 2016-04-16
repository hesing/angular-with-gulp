var pkg = require('../package.json'),
    source = 'public/',
    dest = 'build/',
    envArg = process.argv.indexOf('--env'),
    devBuild = envArg === -1;

module.exports = {
    source: source,
    dest: dest,
    devBuild: devBuild,
    filesToCopy: [
        'public/fonts/**/*.*',
        'public/vendor/**/*.*',
        'public/views/**/*.*'
    ],

    html: { 
        in : source + '**/*.html',
        watch: [source + '**/*.html'],
        out: dest,
        context: {
            devBuild: devBuild,
            author: pkg.author,
            version: pkg.version
        }
    },

    images: { in : source + 'images/*.*',
        out: dest + 'images/'
    },

    css: { 
        in: source + 'scss/main.scss',
        watch: [source + 'scss/**/*.scss', source + 'components/**/*.scss'],
        out: dest + 'css/',
        sassOpts: {
            outputStyle: 'expanded', // nested, expanded, compact, compressed, 
            imagePath: '../images',
            precision: 3,
            sourceComments: 'map',
            errLogToConsole: true
        },
        compassOpts: {
            style: 'expanded',
            css: dest + 'css/',
            sass: source + 'scss/',
            image: 'images',
            sourcemap: true
        },
        pleeeaseOpts: {
            autoprefixer: { browsers: ['last 2 versions', '> 2%'] },
            rem: ['16px'],
            pseudoElements: true,
            mqpacker: true,
            minifier: !devBuild
        }
    },

    componentsCSS: { 
    	in : source + 'components/**/*.scss',
        watch: [source + 'components/**/*.scss'],
        out: dest + "components/"
    },

    fonts: { in : source + 'fonts/*.*',
        out: dest + 'css/fonts/'
    },

    js: { 
        in : source + 'js/**/*.js',
        out: dest + 'js/',
        filename: 'main.min.js',
        vendor: source + 'vendor/'
    },

    vendor: { 
        in : source + 'vendor/**/*',
        out: dest + 'vendor/'
    },

    componentsJS: { 
        in : source + 'components/**/*.js',
        out: dest + 'components/'
    },

    vendor: { in : source + 'vendor/**/*',
        out: dest + 'vendor/'
    },

    syncOpts: {
        server: {
            baseDir: dest,
            index: 'index.html'
        },
        open: true,
        notify: true
    },

    scriptsHtml: source + 'templates/_scripts.html'
};
