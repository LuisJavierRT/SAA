/**
 /**
 * @ngdoc Controller
 * @author Jose Alberto Hidalgo Bonilla
 * @name GestionPlazasCtrl
 * @description
 * #  controller para gestion de plazas
 */ 
(function(){
	'use strict';
	angular
		.module('saaApp')
	    .controller('GestionPlazasCtrl', ['$scope', '$state', 'PlazaService', 'sharePlazaService', 'messageHandlerService',"$uibModal","confirmationModalService", 
	    function($scope, $state, plazaService, sharePlazaService, messageHandlerService,$uibModal,confirmationModalService){
	    	
	    	$scope.plazaList = [];
	    	$scope.mdlTag = "";
			$scope.filters = 0; 

			$scope.viewsVisibility = {
				showFind: true,
				showPlazaList: true,
				showPlazaUpdate: false
			};

			var getPlazaList = function() {
				plazaService.getPlazaList().then(function(result) {
					if(result.success) {
						$scope.plazaList = result.data;
					}
					else {
						messageHandlerService.notifyWarning(null, result.message);
					}
				});
			};

			$scope.sendToPlazaView = function(pId) {
				sharePlazaService.setPlazaId(pId);
				$state.go('ver-plaza');
			};

			$scope.sendToUpdatePlazaView = function(pId) {
				sharePlazaService.setPlazaId(pId);
				$state.go('actualizar-plaza');
			};

			$scope.disablePlaza = function(pId) {
				plazaService.disablePlaza(pId).then(function(result) {
					if(result.success) {
						messageHandlerService.notifySuccess(null, result.message);	
						$scope.plazaList = [];
						getFPlazaList();
					}
					else {
						messageHandlerService.notifyWarning(null, result.message);
					}
				});
			};

			var setModalContent = function(mTitle, mMessage){
				confirmationModalService.setModalContent(mTitle, mMessage);
      		};

		    $scope.openConfirmationModal = function (callback) {
		    	setModalContent('Deshabilitar plaza', '¿Está seguro(a) de que desea deshabilitar la plaza?');
		        var modalInstance = $uibModal.open({
		          animation: true,
		          templateUrl: 'confirmationModalTemplate.html',
		          controller: 'ModalInstanceCtrl',
		          size: 'sm',
		          resolve: {}
		        });

		        modalInstance.result.then(
		          function (confirmationResponse) {
		            callback({
		              success: confirmationResponse
		            });
		        }, function () {
		          callback({
		              success: false
		            });
		        });
		    };


			getPlazaList();
		}]);	
})();
