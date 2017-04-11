(function() {
	"use strict";
	angular
		.module("saaApp")
		.controller("ActualizarPlazaCtrl", ["$scope", "PlazaService", "messageHandlerService","shareSessionService","sharePlazaService", function($scope, plazaService, messageHandlerService,shareSessionService,sharePlazaService) {
			$scope.plaza = {};
			$scope.user = {};
			
			$scope.dateSettings = {
	    		dateFormat:'dd-MM-yyyy',
                showRegDate: false,
                showEndDate: false,
                showAgreDate: false
	    	}; 

			$scope.plaza.fechaAutorizacionInicio = new Date();
			$scope.plaza.fechaAutorizacionFinal = new Date();
			$scope.plaza.fechaAcuerdo = new Date();
			$scope.plaza.fechaRegistro = new Date();
			$scope.plaza.activo = 1;
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

	    	var getPlaza = function(pId) {
				plazaService.getPlaza(pId).then(function(result) {
					console.log(result);
					if(result.success) {
						$scope.plaza = result.data;
					}
					else {
						messageHandlerService.notifyError(null, result.message);
					}
				});
			};

			var getPlazaId = function() {
                $scope.plaza.id = sharePlazaService.getPlazaId();
            };

            $scope.setTCE = function(){
	    		if ($scope.plaza.jornada && $scope.plaza.periodo){
	    			$scope.plaza.tce = ($scope.plaza.periodo/12) * ($scope.plaza.jornada/100);
	    		}
	    		else{
	    			$scope.plaza.tce = undefined;
	    		}
	    	};

		    $scope.validatedPlaza = function(pIsValid, pIsValid2, pData) {
		    	console.log(pData);
		    	if(pIsValid && pIsValid2) {
		    		var plazaInfo = {
		    			id: pData.id,
		    			idcp: pData.idcp,
		    			usuarioActual: $scope.user.usuario,
			    		descripcion: pData.descripcion,
			    		codigo: pData.codigo,
			    		periodo: pData.periodo,
			    		programa: pData.programa,
			    		categoria: pData.categoria,
			    		tipo: pData.tipo,
			    		puesto: pData.puesto,
			    		jornada: pData.jornada,
			    		fechaAutorizacionInicio: pData.fechaAutorizacionInicio,
			    		fechaAutorizacionFinal: pData.fechaAutorizacionFinal,
			    		articulo: pData.articulo,
			    		numeroSesion: pData.numeroSesion,
			    		fechaAcuerdo: pData.fechaAcuerdo,
			    		tce: pData.tce
			    	};
			    	plazaService.updatePlaza(plazaInfo).then(function(result) {
			    		if(result.success) {
			    			messageHandlerService.notifySuccess(null, result.message);
			    			$scope.plaza = plazaInfo;
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
		    getPlazaId();
			getPlaza($scope.plaza.id);
		}]);
})();