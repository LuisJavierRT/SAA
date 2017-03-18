/**
 /**
 * @ngdoc Controller
 * @author Jose Alberto Hidalgo Bonilla
 * @name LoginCtrl
 * @description
 * #  controller para gestion de funcionarios
 */ 
(function(){
	'use strict';
	angular
		.module('saaApp')
	    .controller('GestionFuncionariosCtrl', ['$scope', '$state', 'funcionarioService', 'shareFuncionarioService', 'messageHandlerService', 
	    function($scope, $state, funcionarioService, shareFuncionarioService, messageHandlerService){
	    	
	    	$scope.funcionarioList = [];
	    	$scope.mdlTag = "";
			$scope.filters = 0; 

			$scope.viewsVisibility = {
				showFind: true,
				showfuncionarioList: true,
				showfuncionarioUpdate: false
			};

			var getFuncionarioList = function() {
				funcionarioService.getFuncionarioList().then(function(result) {
					if(result.success) {
						$scope.funcionarioList = result.data;
					}
					else {
						messageHandlerService.notifyWarning(null, result.message);
					}
				});
			};

			$scope.sendToFuncionarioView = function(pId) {
				shareFuncionarioService.setFuncionarioId(pId);
				$state.go('ver-funcionario');
			};

			$scope.sendToUpdateFuncionarioView = function(pId) {
				shareFuncionarioService.setFuncionarioId(pId);
				$state.go('actualizar-funcionario');
			};

			$scope.desactiveFuncionario = function(pId) {
				funcionarioService.desactiveFuncionario(pId).then(function(result) {
					if(result.success) {
						messageHandlerService.notifySuccess(null, result.message);	
						$scope.funcionarioList = [];
						getFuncionarioList();
					}
					else {
						messageHandlerService.notifyWarning(null, result.message);
					}
				});
			};

			getFuncionarioList();
		}]);	
})();
