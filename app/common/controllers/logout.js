/**
 * @ngdoc Controller
 * @author Carlos Fernandez Jimenez
 * @name LoginCtrl
 * @description
 * #  controller para logout
 */ 
(function(){
	'use strict';
	angular
		.module('saaApp')
	    .controller('LogoutCtrl', ['$scope','$location', '$state', 'userService', 'shareSessionService', 'messageHandlerService', 
	    function($scope, $location, $state, userService, shareSessionService, messageHandlerService){
            
            var sendToLogin = function() {
            	$state.go('login');
            };

			var logout = function() {
				shareSessionService.deleteSession();
				sendToLogin();
			};

			logout();
			
		}]);	
})();