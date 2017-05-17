(function(){
	'use strict';
	angular
		.module('saaApp')
	    .controller('PlazaDependenciaCtrl', ['$scope', '$state', 'PlazaService', 'DependenciaService', 'shareSessionService','messageHandlerService', 
	    function($scope, $state, plazaService, dependenciaService, shareSessionService, messageHandlerService) {
            $scope.dependenciaList = [];
            $scope.plazaList = [];
            $scope.user = {};

            $scope.getDependencies = function() {
                dependenciaService.getDependencies().then(function(result) {
                    if(result.success) {
                        $scope.dependenciaList = result.data;
                        console.log($scope.dependenciaList);
                    }
                    else{
                        messageHandlerService.notifyWarning(null, result.message);                        
                    }
                });
            };
            $scope.getPlazas = function() {
                plazaService.getPlazaList().then(function(result) {
                    if(result.success) {
                        $scope.plazaList = result.data;
                        console.log($scope.plazaList);
                    }
                    else{
                        messageHandlerService.notifyWarning(null, result.message);                        
                    }
                });
            };
            $scope.getUser = function() {
                $scope.user = shareSessionService.getSession();
            };

            $scope.dragCallback = function(event, ui, plaza) {
                //setJob_newJobProfessorAssignmentModal( job );
            };
    
            $scope.getUser();
            $scope.getDependencies();
            $scope.getPlazas();
		}]);	
})();