/*
 *Tecnologico de Costa Rica
 *Proyecto de ingenieria de software
 *Luis Javier Ramirez Torres
 *Sistema de apoyo administrativo
*/
var repository = require('../dataAccess/repository.js');

var formatDateFromJSToMySQL = function(JSdate){
    return new Date(JSdate).toISOString().substring(0, 10);
};


exports.assignPlazaDependencia = function(data, callback){
    var paramsString = "";
    data.fechaInicial = formatDateFromJSToMySQL(data.fechaInicial);
    if(data.fechafinal != undefined){
        data.fechaFinal = formatDateFromJSToMySQL(data.fechaFinal);
        paramsString = data.idPlaza+','+data.idDependencia+','+data.jornada+','+ 1 + ',' + "\"" +data.fechaInicial + "\"" + "," + "\"" + data.fechaFinal + "\"" + "," + data.indefinida + "," + "\"" + data.descripcion + "\"";
    }
    else{
        data.fechaFinal = null;
        paramsString = data.idPlaza+','+data.idDependencia+','+data.jornada+','+ 1 + ',' + "\"" +data.fechaInicial + "\"" + "," + data.fechaFinal  + "," + data.indefinida + "," + "\"" + data.descripcion + "\"";
    }

    repository.executeQuery({
        spName: 'sp_agregarPlazaDependencia',
        params: paramsString
    }, 
    function(success, data2) {
        if(success) {
            var paramsString2 = '\"' + data.usuario + '\"' +","+ data.idPlaza + "," + data.idDependencia + ","+ "\"" + "i" + "\"";
            repository.executeQuery({
                spName: 'sp_historialAsignacionPlazaDependencia',
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