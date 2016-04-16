(function() {
    angular.module("myApp")
        .factory('UserService', function($http) {
            return $http.get('http://jsonplaceholder.typicode.com/users');
        });
})();
