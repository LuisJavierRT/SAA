/**
     * @ngdoc Controller
     * @author Jose Alberto Hidalgo Bonilla
     * @name AssignmentModalInstanceCtrl
     * @description
     * #  controller para gestionar la respuestas de los modales
*/
(function() {
    'use strict';
    angular
        .module('saaApp')
        .controller('AssignmentModalInstanceCtrl',['$scope','messageHandlerService','$uibModalInstance','AssignmentModalService','PlazaDependenciaService','shareSessionService',
            function ($scope, messageHandlerService, $uibModalInstance, assignmentModalService,plazaDependenciaService,shareSessionService) {
            $scope.user = {};
            $scope.plaza = {};
            $scope.dependencia = {};
            $scope.assigment = {};
            $scope.dateFormat = 'dd-MM-yyyy';
            $scope.showStartDate = false;
            $scope.showEndDate = false;
            $scope.undefinedAssignment = false;

            $scope.setPlaza = function(plaza) {
                $scope.plaza = plaza;
            };

            $scope.getPlaza = function() {
                return $scope.plaza;
            };

            $scope.setDependencia = function(dependencia) {
                $scope.dependencia = dependencia;
            };

            $scope.getDependencia = function() {
                return $scope.dependencia;
            };

            $scope.setAssignment = function() {
                $scope.assigment.fechaInicial = $scope.plaza.fechaAutorizacionInicio;
                if($scope.plaza.fechaAutorizacionFinal){
                    $scope.assigment.fechaFinal = $scope.plaza.fechaAutorizacionFinal;  
                }
                else{
                    $scope.assigment.fechaFinal = '';
                }
                $scope.assigment.indefinida = 0;
                $scope.assigment.porcentajeAsignado = 0;
                $scope.assigment.descripcion = '';
                if($scope.plaza.fechaAutorizacionFinal == null) {
                    $scope.undefinedAssignment = true;
                }
            };

            $scope.getAssigment = function() {
                return $scope.assigment;
            };


            $scope.assign = function(){
                $scope.assigment.usuario = $scope.user.usuario;
                $scope.assigment.idPlaza = $scope.plaza.id;
                $scope.assigment.idDependencia = $scope.dependencia.id;
                plazaDependenciaService.assign($scope.assigment).then(function(result){
                    if(result.success){
                        $scope.plaza.jornada -= $scope.assigment.jornada;
                        messageHandlerService.notifySuccess(null, result.message);
                    }
                    else{
                        messageHandlerService.notifySuccess(null, result.message);
                    }
                });
            }

            $scope.checkAvailability = function(){
                if($scope.assigment.jornada < 1){
                    messageHandlerService.notifyWarning(null, 'El porcentaje a asignar debe ser mayor a 0%');
                    return false;
                }
                else if($scope.assigment.jornada > $scope.plaza.jornada){
                    messageHandlerService.notifyWarning(null, 'El porcentaje a asignar debe ser menor o igual a ' + $scope.plaza.jornada + '%');
                    return false;
                }
                return true;
            };


            $scope.checkStartDate = function(){
                if ($scope.assigment.fechaInicial){
                    return;
                }
                $scope.assigment.fechaInicial = $scope.plaza.fechaAutorizacionInicio;
            };

            $scope.checkEndDate = function(){
                if ($scope.undefinedAssignment){
                    $scope.assigment.fechaFinal = '';
                    return;
                }
                if (!$scope.assigment.fechaFinal){
                    $scope.assigment.fechaFinal = $scope.plaza.fechaAutorizacionFinal;
                }
            };


            $scope.updateAssignmentType = function (undefinedAssignment) {
                if (undefinedAssignment == true){
                    if ($scope.plaza.fechaAutorizacionFinal != null){
                        messageHandlerService.notifyWarning(null, 'No se puede asignar de forma indefinida porque la plaza está asignada temporalmente');
                        return;
                    }
                    $scope.assigment.indefinida = 0;
                }
                else{
                    $scope.assigment.indefinida = 1;
                }
            }

            $scope.openStartDatePickerPopUp = function(){
                $scope.showStartDate = !$scope.showStartDate;
            };

            $scope.openEndDatePickerPopUp = function(){
                $scope.showEndDate = !$scope.showEndDate;
            };

            $scope.ok = function () {
                if(!$scope.checkAvailability()){
                    return;
                }
                $uibModalInstance.close({
                    success: true,
                    data: $scope.assigment,
                    message: "Operación exitosa"
                });
                $scope.assign();
            };

            $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };

            $scope.getUser = function() {
                $scope.user = shareSessionService.getSession();
            };

            $scope.getUser();
            $scope.setPlaza(assignmentModalService.getPlaza());
            $scope.setDependencia(assignmentModalService.getDependencia());
            $scope.setAssignment();
        }]);    
})();