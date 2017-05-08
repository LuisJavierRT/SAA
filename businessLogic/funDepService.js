/*
 *Tecnologico de Costa Rica
 *Proyecto de ingenieria de software
 *Luis Javier Ramirez Torres
 *Sistema de apoyo administrativo
*/
var repository = require('../dataAccess/repository.js');

exports.assignFunDep = function(data, callback){
    var paramsString = data.idFuncionario+','+data.idDependencia;

    repository.executeQuery({
        spName: 'sp_agregarPerteneceFuncionarioDependencia',
        params: paramsString
    }, 
    function(success, data2) {
        if(success) {
            var paramsString2 = '\"' + data.usuario + '\"' +","+ paramsString + "," + "\"" + "i" + "\"";
            repository.executeQuery({
                spName: 'sp_historialAsignacionFuncionarioDependencia',
                params: paramsString2
            },
            function(success2, data2) {
                callback({
                    success: true, 
                    message: 'Las asignaciones se han realizado exitosamente',
                    data: {}
                });
            });
        } 
        else {
            callback({
                success: false, 
                message: 'Ha ocurrido un error, no se han realizado las asignaciones',
                data: {}
            });
        }
    });    
};