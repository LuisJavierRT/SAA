/*
 *Tecnologico de Costa Rica
 *Proyecto de ingenieria de software
 *Jose Alberto Hidalgo Bonilla
 *Sistema de apoyo administrativo
 *Controlador de funcionarios
*/

var funcionarioService = require('../businessLogic/funcionarioService.js');
//var funcionarioValidator = require('../businessLogic/dataValidator/funcionarioDataValidator.js');

exports.addFuncionario = function(pRequest, pResponse) {
    //var validInformation = funcionarioValidator.validNewFuncionario(pRequest.body);
    var funcionarioResponse = {};

    //if(validInformation.success) {
        funcionarioService.createFuncionario(pRequest.body, function(result) {
            funcionarioResponse.success = result.status;
            funcionarioResponse.message = result.message;
            funcionarioResponse.data = result.data;
            pResponse.status(200);
            pResponse.send(funcionarioResponse);
        });
    //}
    /*else {
        funcionarioResponse.success = false;
        funcionarioResponse.message = validInformation.message;
        pResponse.status(200);
        pResponse.send(funcionarioResponse);
    }*/
};

exports.addAcademics = function(pRequest, pResponse) {
   var academicResponse = {};
   funcionarioService.createAcademicInfo(pRequest.body, function(result) {
        academicResponse.success = result.status;
        academicResponse.message = result.message;
        academicResponse.data = result.data;
        pResponse.status(200);
        pResponse.send(academicResponse);
    }); 
};

exports.addRecords = function(pRequest, pResponse) {
    var funcionarioResponse = {};

    funcionarioService.createAntecedentesFuncionario(pRequest.body, function(result) {
        funcionarioResponse.success = result.status;
        funcionarioResponse.message = result.message;
        funcionarioResponse.data = result.data;
        pResponse.status(200);
        pResponse.send(funcionarioResponse);
    });
};