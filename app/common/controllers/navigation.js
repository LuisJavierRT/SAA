
/**
 * @ngdoc Controller
 * @author Jose Alberto Hidalgo Bonilla
 * @name navigationCtrl
 * @description
 * # controller de navegacion
 */

 (function(){
    'use strict';
    angular
        .module('saaApp')
        .controller('NavegacionCtrl',['$scope','shareSessionService', 'messageHandlerService',  
        function ($scope, shareSessionService, messageHandlerService) {
            $scope.username = '';

            $scope.plazas = [
                
            ]; 

            $scope.funcionarios = [
                
            ];

            $scope.dependencias = [
                {
                    name: "Gestión de Dependencias",
                    link: "gestionar-dependencias"
                }
            ];
            
            $scope.administracion = [
                {
                    name: "Gestión de Usuarios",
                    link: "gestionar-mis-usuarios"
                },
            ];
                    
            $scope.sesion = [
                {
                    name: "Cerrar Sesión",
                    link: "logout"
                }
            ];

          
            var getUserName = function() {
                if(shareSessionService.isStartSession()) {
                    var session = shareSessionService.getSession();
                    $scope.username = session.usuario;
                }  
            };

            getUserName();
         
        }]);    
})();

