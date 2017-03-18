 /**
 * @ngdoc Service
 * @author Jose Alberto Hidalgo Bonilla
 * @name funcionarioService
 * @description
 * #  service for manage funcionario
 */
(function(){
    'use strict';
    angular
        .module('saaApp') 
        .factory('funcionarioService', [
            'requestService',
            function(requestService) {
                var createFuncionario = function(pData) {
                    var link = '/funcionarios';                  
                    return  requestService.postRequest({data: pData, params: ""}, {url: link}).then(function(pResp) {
                        return pResp;
                    },
                    function(pResp){
                        return pResp;
                    });
                };

                var getAllFuncionarios = function(pData) {
                    var link = '/funcionarios';           
                    return requestService.getRequest({params: ""}, {url: link}).then(function(pResp) {
                        return pResp;
                    },
                    function(pResp){
                        return pResp;
                    });
                };

                var getFuncionarioById = function(pId) {
                    var link = '/funcionarios/';
                    
                    return  requestService.getRequest({params: pId}, {url: link}).then(function(pResp) {
                        return pResp; 
                    },  
                    function(pResp){
                        return pResp;   
                    });
                };
           
                return {
                    newFuncionario: function(pData) {
                        return createFuncionario(pData);
                    },
                    getFuncionarioList: function() {
                        return getAllFuncionarios();
                    },
                    getFuncionario: function(pId) {
                        return getFuncionarioById(pId);
                    }
                };
        }]);
})();