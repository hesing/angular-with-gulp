var fs = require('fs');
var config = require('./config');

module.exports = function() {
    var jsFiles = [],
        indexContents,
        scriptTagsPattern,
        match;

    // if (!grunt.file.exists(indexPath)) {
    //     grunt.log.warn('Index file "' + indexPath + '" not found.');
    //     return false;
    // }

    indexContents = fs.readFileSync(config.scriptsHtml);
    scriptTagsPattern = /<script.+?src="(.+?)".*?><\/script>/gm;
    match = scriptTagsPattern.exec(indexContents);
    while (match) {
        // if (!(/livereload-setup\.js/.test(match[1]))) {
        jsFiles.push(config.source + match[1]);
        // }
        match = scriptTagsPattern.exec(indexContents);
    }
    jsFiles.pop(); // remove production script `main.min.js` 
    return jsFiles;
}
