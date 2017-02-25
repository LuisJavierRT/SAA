/*
 *Tecnologico de Costa Rica
 *Proyecto de ingenieria de software
 *Luis Javier Ramirez Torres
 *Sistema de apoyo administrativo
*/
var repository = require('../dataAccess/repository.js');

exports.validateUser = function(data, callback){
    var paramsString = '\"'+data.userName+'\"'+','+'\"'+data.password+'\"';

    repository.executeQuery({
        spName: 'sp_login',
        params: paramsString
    }, 
    function(success, data) {
        if(success) {
            data = data[0];//verificar estado
            if(data.length > 0) {
                callback({
                    status: true, 
                    message: 'Usuario válido',
                    data: data[0]
                });
            }
            else {
                callback({
                    status: false, 
                    message: 'Usuario o contraseña no valida',
                    data: {}
                });
            }
        } 
        else {
            callback({
                status: false, 
                message: 'Ha ocurrido un error, no se ha validado la sesión',
                data: {}
            });
        }
    });    
};