
/**
 * @ngdoc Controller
 * @author Jose Hidalgo Bonilla
 * @name LoginCtrl
 * @description
 * #controller para login
 */
(function(){
	'use strict';
	angular
		.module('saaApp')
	    .controller('LoginCtrl', ['$scope','$location','$state', 'userService', 'shareSessionService', 'messageHandlerService',
	    function($scope, $location, $state, userService, shareSessionService, messageHandlerService){
			$scope.userData = {
				userName: '',
				password: ''
			};

			var sendToHome = function() {
				$state.go('asignar-plazas-profesores');
			};

			var welcomeMessage = function() {
                var message = 'Bienvenido al Sistema de Apoyo Administrativo';
                messageHandlerService.notifySuccess(null, message);

            };

			$scope.login = function(pData) {
				userService.logIn(pData).then(function(result) {
					if(result.success) {
						shareSessionService.setSession(result.data);
						welcomeMessage();
				        sendToHome();
					}
					else {
						messageHandlerService.notifyWarning(null, result.message);
					}
				});
			};

		}]);
})();
