'use strict';

/**
 * @ngdoc Controller
 * @author Luis Javier Ramírez Torres
 * @name GestionUsuariosCtrl
 * @description
 * #  controller para la gestion de usuarios
 */
angular
  .module('saaApp')
  .controller('GestionUsuariosCtrl', function ($scope, requestService, messageHandlerService) {
  	$scope.usersList = {};
  	$scope.inputUser = {};
  	$scope.getUsers = function(){
  		requestService.getRequest({params: ""}, {url: '/users'})
  			.then(function(result){
  				if (result.success){
					$scope.usersList = result.data;
					
  				}else{
  					$scope.usersList = {};
  					messageHandlerService.notifyWarning(null, result.message);
  				}
			});	
  	};

  	$scope.editUser = function(userToEdit){
      	$scope.inputUser.usuario = userToEdit.usuario;
        $scope.inputUser.contrasena = userToEdit.contrasena;
      	$scope.inputUser.nombre = userToEdit.nombre;
        $scope.inputUser.correo = userToEdit.correo;
        $scope.inputUser.cedula = userToEdit.cedula;
        $scope.inputUser.tipo = userToEdit.tipo;
        $scope.inputUser.fechaInicioAutorizacion = userToEdit.fechaInicioAutorizacion;
        $scope.inputUser.fechaFinalAutorizacion = userToEdit.fechaFinalAutorizacion;
  	};

  	$scope.updateUser = function (userToUpdate) {
  		requestService.putRequest({params: userToUpdate.usuario, data: userToUpdate}, {url: "/users/"})
  			.then(function(result){
		        if (result.success == true){
		          $scope.getUsers();
		          messageHandlerService.notifySuccess(null, result.message)
		          $scope.inputUser = {};
		        }
		        else{
		          messageHandlerService.notifyError(null, result.message);
		        }
	      	});
	};
  	
	$scope.addUser = function (newUser) {
    newUser.activo = 1;
		requestService.postRequest({params: "", data: newUser}, {url: "/users"})
			.then(function(result){
	        if (result.success == true){
	          $scope.getUsers();
	          messageHandlerService.notifySuccess(null, result.message)
	          $scope.inputUser = {};
	        }
	        else{
            if (!result.message) {
              messageHandlerService.notifyError(null, "Por favor revise los valores ingresados");
              return;
            };
	          messageHandlerService.notifyError(null, result.message);
	        }
      	});
	};


  	$scope.getUsers();
  });