(function (myApp) {

    myApp
        .factory('errorHttpInterceptor', ['$q', '$injector', function ($q, $injector) {
            return {
                responseError: function responseError(rejection) {
                    var alerting = $injector.get("alerting");
                    alerting.addDanger('HTTP response error');
                    return $q.reject(rejection);
                }
            };
        }])
        .config(['$httpProvider', '$provide', function ($httpProvider, $provide) {
            $provide.decorator("$exceptionHandler", function ($delegate, $injector) {
                return function (exception, cause) {
                    $delegate(exception, cause);
                    var alerting = $injector.get("alerting");
                    alerting.addDanger(exception.message);
                };
            });
            $httpProvider.interceptors.push('errorHttpInterceptor');
        }]);

}(angular.module("myApp")));