(function(){
	'use strict';
	angular
		.module('saaApp')
		.controller('GestionDependenciasCtrl', ['$scope', 'DependenciaService', 'messageHandlerService', 'shareSessionService', function($scope, dependenciaService, messageHandlerService, shareSessionService){
			$scope.dependencyList = {};
		  	$scope.inputDependency = {};
		  	$scope.getDependencies = function(){
		  		dependenciaService.getDependencies().then(function(result){
		  			if (result.success){
						$scope.dependencyList = result.data;
	  				}
	  				else{
	  					$scope.dependencyList = {};
	  					messageHandlerService.notifyWarning(null, result.message);
	  				}
		  		});
		  	};

		  	$scope.editDependency = function(dependencyToEdit){
		      	$scope.inputDependency.codigo = dependencyToEdit.codigo;
		        $scope.inputDependency.nombre = dependencyToEdit.nombre;
		      	$scope.inputDependency.id = dependencyToEdit.id;
		  	};

		  	$scope.updateDependency = function (dependencyToUpdate) {
		  		dependenciaService.editDependency(dependencyToUpdate).then(function(result) {
		  			if (result.success){
			          $scope.getDependencies();
			          messageHandlerService.notifySuccess(null, result.message)
			          $scope.inputDependency = {};
			        }
			        else{
			          messageHandlerService.notifyError(null, result.message);
			        }
		  		});
			};
		  	
			$scope.addDependency = function (newDep) {
				newDep.usuario = $scope.getUser().usuario;
				dependenciaService.addDependency(newDep).then(function(result) {
					if(result.success) {
						$scope.getDependencies();
			          	messageHandlerService.notifySuccess(null, result.message)
			        	$scope.inputDependency = {};
					}
					else{
						messageHandlerService.notifyError(null, result.message);
					}
				});
			};

			$scope.getUser = function() {
				return shareSessionService.getSession();
			};


		  	$scope.getDependencies();
		}]);
})();
