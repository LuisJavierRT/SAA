(function() {
	"use strict";
	angular
		.module("saaApp")
		.controller("NuevaPlazaCtrl", ["$scope", "PlazaService", "messageHandlerService","shareSessionService", function($scope, plazaService, messageHandlerService,shareSessionService) {
			$scope.plaza = {};
			$scope.user = {};
			
			$scope.dateSettings = {
	    		dateFormat:'dd-MM-yyyy',
                showRegDate: false,
                showEndDate: false,
                showAgreDate: false
	    	}; 

			$scope.plaza.fechaAutorizacionInicial = new Date();
			$scope.plaza.fechaAutorizacionFinal = new Date();
			$scope.plaza.fechaAcuerdo = new Date();
			$scope.typeList = ["CF", "NT", "FS", "CT"];

			$scope.openRegDatePickerPopUp = function() {	
		    	$scope.dateSettings.showRegDate = !$scope.dateSettings.showRegDate;
		      	return $scope.dateSettings.showRegDate;
		    };

		    $scope.openEndDatePickerPopUp = function() {	
		    	$scope.dateSettings.showEndDate = !$scope.dateSettings.showEndDate;
		      	return $scope.dateSettings.showEndDate;
		    };

		    $scope.openAgreDatePickerPopUp = function() {	
		    	$scope.dateSettings.showAgreDate = !$scope.dateSettings.showAgreDate;
		      	return $scope.dateSettings.showAgreDate;
		    };

		    $scope.getUser = function() {
	    		$scope.user = shareSessionService.getSession();
	    	};


		    $scope.validatedPlaza = function(pIsValid, pIsValid2, pData) {
		    	if(pIsValid && pIsValid2) {
		    		var plazaInfo = {
		    			usuarioActual: $scope.user.usuario,
			    		descripcion: pData.descripcion,
			    		codigo: pData.codigo,
			    		periodo: pData.periodo,
			    		programa: pData.programa,
			    		categoria: pData.categoria,
			    		tipo: pData.tipo,
			    		puesto: pData.puesto,
			    		porcentajeCreacion: pData.porcentajeCreacion,
			    		fechaAutorizacionInicio: pData.fechaAutorizacionInicial,
			    		fechaAutorizacionFinal: pData.fechaAutorizacionFinal,
			    		articulo: pData.articulo,
			    		numeroAcuerdo: pData.numeroAcuerdo,
			    		fechaAcuerdo: pData.fechaAcuerdo
			    	};
			    	console.log(plazaInfo);
			    	plazaService.addPlaza(plazaInfo).then(function(result) {
			    		if(result.success) {
			    			plazaInfo.idPlaza = result.data;
					    	plazaService.addPlazaInfo(plazaInfo).then(function(result) {
					    		if(result.success) {
					    			messageHandlerService.notifySuccess(null, result.message);
					    			$scope.plaza = {};
					    			$scope.plaza.fechaAutorizacionInicial = new Date();
									$scope.plaza.fechaAutorizacionFinal = new Date();
									$scope.plaza.fechaAcuerdo = new Date();
					    		}
					    		else{
					    			messageHandlerService.notifyError(null, result.message);
					    		}
					    	});
			    		}
			    		else{
			    			messageHandlerService.notifyError(null, result.message);
			    		}
			    	});
		    	}
		    	else{
			    	messageHandlerService.notifyWarning(null, "Debe completar todo los campos correctamente");
		    	}
		    };

		    $scope.getUser();

		}]);
})();