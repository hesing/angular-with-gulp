(function() {
    angular.module("myApp")
        .controller('UsersCtrl', function($scope, UserService, alerting) {
            UserService
            	.success(function(res){
            		$scope.photos = res;
            		alerting.addAlert('success', 'User fetched successfully');
            	});
        });
})();
