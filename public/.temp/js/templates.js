angular.module('myApp').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('views/home.html',
    "<div class=\"jumbotron\"><div class=\"container\"><h1>Welcome Dude!</h1><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi dicta eveniet soluta eos, beatae alias numquam suscipit ratione accusantium pariatur!</p><p><a class=\"btn btn-primary btn-lg\" ui-sref=\"books\">Go to books</a></p></div></div>"
  );

}]);
