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
	    			annoGraduacion:'' 
	    		},
	    		antecedente: ''
	    		
	    	};

			$scope.funcionario.infoPersonal.fecha = new Date();
	    	$scope.inputFuncionario.infoAcademica.annoGraduacion = new Date();


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
	    		$scope.inputFuncionario.infoAcademica.annoGraduacion = new Date(); 
		    };
/*
		    var cleanEngagementInfo = function() {
	    		
	    		$scope.inputFuncionario.contratacion.numero = '';
	    		$scope.inputFuncionario.contratacion.actividad = '';
	    		$scope.inputFuncionario.contratacion.descripcion = '';
		    };*/

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
/*
	    	$scope.validEngagementInfo = function(pIsValid, pId, pData) {
	    		var periodIndex = document.getElementById("opPeriod");
	    		var periodTitle = periodIndex.options[periodIndex.selectedIndex].text;
	    		
	    		
	    		if(pIsValid) {
	    			var data = {
	    				id: pId,
	    				params: {
			    			numero: pData.numero,
			    			annio: pData.annio,
			    			periodo: periodTitle,
			    			actividad: pData.actividad,
			    			descripcion: pData.descripcion
			    		}
		    		};
		    		console.log(data);
	    			addEngagementInfoProfessor(data); 
	    		}
	    		else {
					var message = 'Debe completar la información de contrataciones de manera completa';
					messageHandlerService.notifyError(null, message);
	    		}
	    	}; 	*/

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

	    	$scope.sendToFuncionarioView = function() {
	    		$state.go('gestionar-funcionario');
			};

			var getFuncionarioId = function() {
                $scope.funcionario.id = shareFuncionarioService.getFuncionarioId();
            };
/*
			var getProfessorId = function() {
                $scope.funcionario.id = funcionarioService.getProfessorId();
            };

            var getAllDegrees = function() {
	    		academicService.getAcademicDegreeList().then(function(result) {
					if(result.success) {
						$scope.degreeList = result.data;
					}
					else {
						messageHandlerService.notifyWarning(null, result.message);
					}
				});
	    	};

	    	var getAllCodes = function() {
	    		careerService.getCareerCodeList().then(function(result) {
					if(result.success) {
						$scope.codeList = result.data;
					}
					else {
						messageHandlerService.notifyWarning(null, result.message);
					}
				});
	    	};

	    	var getAllAreas = function() {
	    		careerService.getAreaExpertiseList().then(function(result) {
					if(result.success) {
						$scope.areaList = result.data;
					}
					else {
						messageHandlerService.notifyWarning(null, result.message);
					}
				});
	    	};

	    	var getAllPeriods = function() {
	    		periodService.getPeriodList().then(function(result) {
					if(result.success) {
						$scope.periodList = result.data;
					}
					else {
						messageHandlerService.notifyWarning(null, result.message);
					}
				});
	    	};
	    	*/

            //getProfessorId();
	    	//getAllDegrees();
	    	//getAllCodes();
	    	//getAllAreas();
	    	//getAllPeriods();
	    	getFuncionarioId();
			getFuncionario($scope.funcionario.id);
			getAcademicInfo($scope.funcionario.id); 
			getRecords($scope.funcionario.id); 
		}]);	
})();