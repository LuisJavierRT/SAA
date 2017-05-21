(function(){
	'use strict';
	angular
		.module('saaApp')
	    .controller('PlazaDependenciaCtrl', ['$scope',"$q", '$uibModal','$state', 'PlazaService', 'DependenciaService', 'shareSessionService','messageHandlerService', 'AssignmentModalService','PlazaDependenciaService',
	    function($scope, $q, $uibModal, $state, plazaService, dependenciaService, shareSessionService, messageHandlerService, assignmentModalService,plazaDependenciaService) {
            $scope.dependenciaList = [];
            $scope.plazaList = [];
            $scope.user = {};


            $scope.getDependencies = function() {
                var error;
                dependenciaService.getDependencies().then(function(result) {
                    if(result.success) {
                        error = false;
                        $scope.dependenciaList = result.data;

                        $q.all($scope.dependenciaList).then(function(arrayOfResults) { 
                        if(error) {
                            messageHandlerService.notifyError(null, result.message);                                        
                        }
                        else{
                            $scope.getPlazasPorDependencia();
                            
                            }
                        });
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

            $scope.getPlazasPorDependencia = function(){
                var c = 0;
                for (var j = 0; j < $scope.dependenciaList.length; j++) {
                    
                    var data = {id: $scope.dependenciaList[j].id};

                    plazaDependenciaService.getPlazasPorDependencia(data.id).then(function(result){
                        if(result.success){
                            $scope.dependenciaList[c].plazas = result.data;
                            c+=1;
                        }
                        else{
                            messageHandlerService.notifyWarning(null, result.message); 
                        }
                    });   
                }
            }


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