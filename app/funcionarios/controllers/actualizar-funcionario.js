/**
 /**
 * @ngdoc Controller
 * @author Luis Javier Ramírez Torres
 * @name ActualizarProfesorCtrl
 * @description
 * #  controller para actualizar la informacion de un funcionario
 */ 
(function(){
	'use strict';
	angular
		.module('saaApp')
	    .controller('ActualizarFuncionarioCtrl', ['$scope', '$location', '$state', 'funcionarioService', 'academicService', 'recordService', 'shareSessionService', 'shareFuncionarioService', 'messageHandlerService', 
	    function($scope, $location, $state, funcionarioService, academicService,recordService, shareSessionService, shareFuncionarioService, messageHandlerService){

	    	$scope.funcionarioList = [];
	    	$scope.user = {};

	    	$scope.dateSettings = {
	    		dateFormat:'dd-MM-yyyy',
                showRegDate: false
	    	}; 

	    	$scope.yearDegreeSettings = {
			    yearFormat: 'yyyy',
			    startingDay: 1,
			    minMode: 'year',
			    showRegYear: false
			};
			
	    	$scope.funcionario = {
	    		infoPersonal: {
	    			cedulaFuncionario: '',
	    			nombreFuncionario: '',
	    			primerApellido: '',
	    			segundoApellido: '',
	    			fecha: '',
	    			especialidad: ''
	    		},
	    		infoAcademica: [],
	    		antecedentes: []
	    	};

	    	$scope.inputFuncionario = {
	    		infoAcademica: {
	    			titulo: '',
	    			universidad: '',
	    			grado: '',
	    			annoObtencion:'' 
	    		},
	    		antecedente: ''
	    		
	    	};

			$scope.funcionario.infoPersonal.fecha = new Date();
	    	$scope.inputFuncionario.infoAcademica.annoObtencion = new Date();
	    	$scope.degreeList = ["Bachillerato", "Licenciatura", "Maestría", "Doctorado"];

	    	$scope.openDatePickerPopUp = function() {
		    	$scope.dateSettings.showRegDate = !$scope.dateSettings.showRegDate;
		      	return $scope.dateSettings.showRegDate;
		    };

		    $scope.openYearDegreePopUp = function($event) {
		    	$scope.yearDegreeSettings.showRegYear = !$scope.yearDegreeSettings.showRegYear;
		      	return $scope.yearDegreeSettings.showRegYear;
		    };

		    $scope.openYearEngagementPopUp = function($event) {
		    	$scope.yearEngagementSettings.showRegYear = !$scope.yearEngagementSettings.showRegYear;
		      	return $scope.yearEngagementSettings.showRegYear;
		    };

		    var cleanAcademicInfo = function() {
		    	$scope.inputFuncionario.infoAcademica.titulo = '';
	    		$scope.inputFuncionario.infoAcademica.universidad = ''; 
	    		$scope.inputFuncionario.infoAcademica.grado = '';
	    		$scope.inputFuncionario.infoAcademica.annoObtencion = new Date(); 
		    };

		    var getFuncionariosList = function() {
				funcionarioService.getFuncionarioList().then(function(result) {
					if(result.success) {
						$scope.funcionarioList = result.data;
					}
					else {
						messageHandlerService.notifyWarning(null, result.message);
					}
				});
			};


	    	var getFuncionario = function(pId) {
				funcionarioService.getFuncionario(pId).then(function(result) {
					if(result.success) {
						$scope.funcionario.infoPersonal = result.data;
					}
					else {
						messageHandlerService.notifyWarning(null, result.message);
					}
				});
			};

			var getAcademicInfo = function(pId) {
				academicService.getAcademicFuncionarioInfo(pId).then(function(result) {
					if(result.success) {
						$scope.funcionario.infoAcademica = result.data;
						console.log(result.data);
						
					}
					else {
						$scope.funcionario.infoAcademica = [];
					}
				});
			};

			var addAcademicInfoFuncionario = function(pData) {
	    		academicService.newAcademicFuncionarioInfo(pData).then(function(result) {
					if(result.success) {
						cleanAcademicInfo(); 
						getAcademicInfo($scope.funcionario.id);
						messageHandlerService.notifySuccess(null, result.message);							
					}
					else {
						messageHandlerService.notifyWarning(null, result.message);	
					}
				});
	    	};

			var getRecords = function(pId) {
				recordService.getRecordFuncionarioList(pId).then(function(result) {
					if(result.success) {
						$scope.funcionario.antecedentes = result.data;
						console.log(result.data);
					}
					else {
						$scope.funcionario.antecedentes = [];
					}
				});
			};

			var addRecordInfoFuncionario = function(pData) {
	    		recordService.newRecordInfoFuncionario(pData).then(function(result) {
					if(result.success) {
						$scope.inputFuncionario.antecedente = '';
						getRecords($scope.funcionario.id);
						messageHandlerService.notifySuccess(null, result.message);						
					}
					else {
						messageHandlerService.notifyWarning(null, result.message);	
					}

				});

	    	};

	    	$scope.validRecordInfo = function(pIsValid, pId, pData) {
	    	console.log(pId+"##"+pData);
	    		if(pIsValid){
	    			var data = {
						id: pId,	
						params: {
							descripcion: pData 
						}
					};
					console.log("#########");
					console.log(data);
					addRecordInfoProfessor(data); 
	    		}
	    		else {
	    			var message = 'Debe completar la información de antecedentes de manera completa';
					messageHandlerService.notifyError(null, message);
	    		}
	    	};


	    	$scope.validAcademicInfo = function(pIsValid, pId, pData) {
	    		if(pIsValid) {
	    			var degreeIndex = document.getElementById("opDegree");
	    		    var degreeTitle = degreeIndex.options[degreeIndex.selectedIndex].text;
	    		    pData.grado = degreeTitle;
	    		    
	    		    var data = {
						id: pId,	
						params: pData
					};
	    			
	    			addAcademicInfoFuncionario(data);
	    		}
	    		else {
	    			var message = 'Debe completar la información académica de manera completa';
					messageHandlerService.notifyError(null, message);
	    		}
	    	};

	    	$scope.editFuncionarioTitulos = function(tituloToEdit){
		      	$scope.inputFuncionario.infoAcademica.titulo = tituloToEdit.titulo;
		      	$scope.inputFuncionario.infoAcademica.universidad = tituloToEdit.universidad;
		      	$scope.inputFuncionario.infoAcademica.grado = tituloToEdit.gradoAcademico;
		        $scope.inputFuncionario.infoAcademica.annoObtencion = tituloToEdit.annoObtencion;
		  	};

		  	$scope.editFuncionarioAntecedentes = function(antecedenteToEdit){
		  		$scope.inputFuncionario.antecedente = antecedenteToEdit.descripcion;
		  	}


		  	$scope.updateFuncionario = function (funcionarioToUpdate) {
		  		funcionarioToUpdate.activo = 1;
		  		funcionarioToUpdate.usuario = $scope.user.usuario;
		  		funcionarioService.editFuncionario(funcionarioToUpdate).then(function(result) {
		  			if (result.success){
			        	//$scope.getFuncionariosList();
			          	messageHandlerService.notifySuccess(null, result.message)
			          	//$scope.inputFuncionario = {};
			        }
			        else{
			          	messageHandlerService.notifyError(null, result.message);
			        }
		  		});
			};

			$scope.updateFuncionarioTitulos = function (tituloToUpdate) {
		  		tituloToUpdate.usuario = $scope.user.usuario;
		  		tituloToUpdate.idFuncionario = $scope.funcionario.id;
		  		academicService.editAcademicDegree(tituloToUpdate).then(function(result) {
		  			if (result.success){
			        	//$scope.getFuncionariosList();
			          	messageHandlerService.notifySuccess(null, result.message)
			          	//$scope.inputFuncionario.infoAcademica = {};
			        }
			        else{
			          	messageHandlerService.notifyError(null, result.message);
			        }
		  		});
			};

			$scope.updateFuncionarioAntecedentes = function (antecedenteToUpdate) {
		  		antecedenteToUpdate.usuario = $scope.user.usuario;
		  		antecedenteToUpdate.idFuncionario = $scope.funcionario.id;
		  		recordService.editRecordInfo(antecedenteToUpdate).then(function(result) {
		  			if (result.success){
			        	//$scope.getFuncionariosList();
			          	messageHandlerService.notifySuccess(null, result.message)
			          	//$scope.inputFuncionario.infoAcademica = {};
			        }
			        else{
			          	messageHandlerService.notifyError(null, result.message);
			        }
		  		});
			};


	    	$scope.sendToFuncionarioView = function() {
	    		$state.go('gestionar-funcionario');
			};

			var getFuncionarioId = function() {
                $scope.funcionario.id = shareFuncionarioService.getFuncionarioId();
            };

            $scope.getUser = function() {
	    		$scope.user = shareSessionService.getSession();
	    	};

            //getProfessorId();
	    	//getAllDegrees();
	    	//getAllCodes();
	    	//getAllAreas();
	    	//getAllPeriods();
	    	$scope.getUser();
	    	getFuncionarioId();
	    	getFuncionariosList();
			getFuncionario($scope.funcionario.id);
			getAcademicInfo($scope.funcionario.id); 
			getRecords($scope.funcionario.id);
			
		}]);	
})();