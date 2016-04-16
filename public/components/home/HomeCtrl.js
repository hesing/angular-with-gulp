(function() {
    angular.module("myApp")
        .controller('HomeCtrl', function($scope, alerting) {
            $scope.title = "Home - I am from home controller";
            alerting.addAlert('info', 'Home controller loaded');
        });
})();
