(function(){
	'use strict';
	angular
		.module('saaApp')
	    .controller('PlazaDependenciaCtrl', ['$scope', '$uibModal','$state', 'PlazaService', 'DependenciaService', 'shareSessionService','messageHandlerService', 'AssignmentModalService',
	    function($scope, $uibModal, $state, plazaService, dependenciaService, shareSessionService, messageHandlerService, assignmentModalService) {
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
                assignmentModalService.setPlaza(plaza);
            };

            $scope.dropCallback = function(event, ui, dependencia) {
                assignmentModalService.setDependencia(dependencia);
                $scope.openNewAssignmentModal(function(response) {
                    if(!response.success){
                        return;
                    }
                    console.log(response.data);
                });
            };

            $scope.openNewAssignmentModal = function (callback) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'asignacionPlazaDependenciaTemplate.html',
                    controller: 'AssignmentModalInstanceCtrl',
                    size: 'md',
                    resolve: {}
                });

                modalInstance.result.then(
                    function (confirmationResponse) { //success
                        callback(confirmationResponse);
                    }, 
                    function () {
                        callback({
                            success: false,
                            data: null,
                            message: 'Se cancela la asignacion de la plaza al profesor'
                        });
                    });
            };
    
            $scope.getUser();
            $scope.getDependencies();
            $scope.getPlazas();
		}]);	
})();