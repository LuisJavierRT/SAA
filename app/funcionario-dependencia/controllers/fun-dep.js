/*
 * @ngdoc Controller
 * @author Jose Alberto Hidalgo Bonilla
 * @name FunDepCtrl
 * @description
 * #  controller para asignar funcionarios a dependencias
 */ 
(function(){
	'use strict';
	angular
		.module('saaApp')
	    .controller('FunDepCtrl', ['$scope', '$state', 'funcionarioService', 'DependenciaService', 'FunDepService', 'shareSessionService','messageHandlerService', 
	    function($scope, $state, funcionarioService, dependenciaService, funDepService, shareSessionService, messageHandlerService) {
            $scope.funcionarioList = [];
            $scope.dependenciaList = [];
            $scope.user = {};

            $scope.getFuncionarios = function() {
                funcionarioService.getFuncionarioList().then(function(result) {
                    if(result.success) {
                        $scope.funcionarioList = result.data;
                    }
                    else{
                        messageHandlerService.notifyWarning(null, result.message);
                    }
                });
            };
            $scope.getDependencias = function() {
                dependenciaService.getDependencies().then(function(result) {
                    if(result.success) {
                        $scope.dependenciaList = result.data;
                    }
                    else{
                        messageHandlerService.notifyWarning(null, result.message);                        
                    }
                });
            };
            $scope.assign = function(funcionarios, idD) {
                for(var i=0; i<funcionarios.length; i++) {
                    var data = {usuario: $scope.user.usuario, idFuncionario: funcionarios[i], idDependencia: idD};
                    funDepService.assign(data).then(function(result) {
                        if(!result.success){
                            messageHandlerService.notifyError(null, result.message);                        
                        }
                    });
                }
            };

            $scope.getUser = function() {
                $scope.user = shareSessionService.getSession();
            };

            $scope.getUser();
            $scope.getDependencias();
            $scope.getFuncionarios();
		}]);	
})();