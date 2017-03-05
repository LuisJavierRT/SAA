(function(){
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
    .controller('GestionUsuariosCtrl', ["$scope", "UsuarioService", "messageHandlerService", function ($scope, usuarioService, messageHandlerService) {
      $scope.dateFormat = "dd-MM-yyyy";
      $scope.usersList = {};
      $scope.inputUser = {};
      $scope.showRegDate = false;
      $scope.showEndDate = false;

      $scope.openRegDatePickerPopUp = function(){
        $scope.showRegDate = !$scope.showRegDate;
        return $scope.showRegDate;
      };

      $scope.openEndDatePickerPopUp = function(){
        $scope.showEndDate = !$scope.showEndDate;
        return $scope.showEndDate;
      };

      $scope.getUsers = function(){
        usuarioService.getUsers().then(function(result) {
          if (result.success){
            $scope.usersList = result.data;
          }
          else{
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
        $scope.inputUser.activo = userToEdit.activo.data[0];
      };

      $scope.updateUser = function (userToUpdate) {
        usuarioService.editUser(userToUpdate).then(function(result) {
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
        console.log(newUser);
        usuarioService.addUser(newUser).then(function(result) {
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
  }]);
})();