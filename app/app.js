
'use strict';

/**
 * @ngdoc App
 * @name saaApp
 * @description
 * # saaApp
 */
angular
  .module('saaApp', [
    'ui.router',
    'ui-notification',
    'ui.bootstrap',
    'ui.navbar'
    //'ngDragDrop',
    //'angular.filter',
    //'toggle-switch',
    //'chart.js'
  ])
  .config(function($stateProvider, $urlRouterProvider) {

    //muestra esta vista por defecto
    //$urlRouterProvider.when('/mis-plazas', '/mis-plazas/asignar-y-configurar');
    //redirecciona en caso de nos reconocer la ruta ingresada
    $urlRouterProvider.otherwise('/login');

    $stateProvider
      //vista abstracta sobre la que se carga las demás vistas principales
      .state('base', {
        abstract: true,
        url: '',
        templateUrl: 'common/views/base.html'
      })
      .state('login', {
        url: '/login',
        parent: 'base',
        templateUrl: 'login/views/login.html',
        controller: 'LoginCtrl'
      })
      .state('logout', {
        controller: 'LogoutCtrl'
      })
      .state('saa', {
        url: '/saa',
        parent: 'base',
        templateUrl: 'common/views/saa.html'
      })
      .state('gestionar-mis-usuarios', {
        url: '/gestionar-mis-usuarios',
        parent: 'saa',
        templateUrl: 'mis-usuarios/views/gestionar-usuarios.html',
        controller: 'GestionUsuariosCtrl'
      })
      .state('gestionar-dependencias', {
        url: '/gestionar-dependencias',
        parent: 'saa',
        templateUrl: 'dependencias/views/gestionar-dependencias.html',
        controller: 'GestionDependenciasCtrl'
      })
  })

.directive('stringToNumber', function() {
  return {
    require: 'ngModel',
    link: function(scope, element, attrs, ngModel) {
      ngModel.$parsers.push(function(value) {
        return '' + value;
      });
      ngModel.$formatters.push(function(value) {
        return parseFloat(value, 10);
      });
    }
  };
});
