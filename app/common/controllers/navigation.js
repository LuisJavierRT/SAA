
'use strict';

/**
 * @ngdoc Controller
 * @author Antony Duran Hernandez, Carlos Fernandez Jimenez
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
                
            ];
            
            $scope.administracion = [
                
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

