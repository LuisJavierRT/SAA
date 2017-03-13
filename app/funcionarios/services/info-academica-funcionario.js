/**
 * @ngdoc Service
 * @author Jose Alberto Hidalgo Bonilla
 * @name professorService
 * @description
 * #  service para datos academicos
 */
(function(){
    'use strict';
    angular
        .module('saaApp') 
        .factory('academicService', [
            'requestService',
            function(requestService) {
                var createAcademicDegree = function(pData) {
                    var link = '/funcionarios/academics';                 
                    return  requestService.postRequest({data: pData, params: ""}, {url: link}).then(function(pResp) {
                                return pResp;
                            },
                            function(pResp){
                                return pResp;
                            });
                };
           
                return {
                    newAcademicFuncionarioInfo: function(pData) {
                        return createAcademicDegree(pData);
                    },
                };
        }]);
})();