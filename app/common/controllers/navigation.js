
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
                {
                    name: "Asignar plazas a profesores",
                    link: "asignar-plazas-profesores"
                }, 
                {
                    name: "Asignar mis plazas a dependencias",
                    link: "asignar-mis-plazas-dependencias"
                }
            ]; 

            $scope.profesores = [
                {
                    name: "Agregar un nuevo profesor",
                    link: "nuevo-profesor"
                },
                {
                    name: "Gestionar todos los profesores",
                    link: "gestionar-mis-profesores"
                }
            ];

            $scope.portafolios = [
                {
                    name: "Gestionar mis portafolios",
                    link: "mis-portafolios"
                }
            ];

            $scope.portafolios = [
                {
                    name: "Gestionar mis portafolios",
                    link: "mis-portafolios"
                }
            ];
            
            $scope.administracion = [
                {
                    name: "Asignar plazas a dependencias",
                    link: "asignar-plazas-dependencias"
                },
                {
                    name: "Gestionar todas las plazas",
                    link: "gestionar-plazas"
                }, 
                {
                    name: "Gestionar todos los portafolios",
                    link: "gestionar-portafolios"
                }, 
                {
                    name: "Gestionar dependencias",
                    link: "gestionar-dependencias"
                }
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

