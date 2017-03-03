/*
 *Tecnologico de Costa Rica
 *Proyecto de ingenieria de software
 *Luis Javier Ramírez Torres
 *Sistema de apoyo administrativo
*/
var repository = require('../dataAccess/repository.js');
var userValidator = require('./dataValidator/userValidator.js');

exports.allUsers = function(callback){
    repository.executeQuery({
        spName: 'sp_getUsers',
        params: ''
    }, 
    function(success, data) {
        if(success) {
            data = data[0];
            if (data.length == 0){
                callback(
                {
                    success: false,
                    data: null,
                    message: "No hay registro de usuarios"
                });
            }
            else{
                callback(
                    {
                        success: true,
                        message: "Operación exitosa",
                        data: data
                    });
            }
        } 
        else 
        {callback(
            {
                success: false,
                data: null,
                message: "No se pudo establecer la conexión a la base de datos"
            });
        }
    });
};

exports.userByUsername = function(data, callback){
    repository.executeQuery({
        spName: 'sp_getUserByUsername',
        params: data.id
    }, 
    function(success, data) {
        if(success) {
            data = data[0];
            if (data.length == 0){
                callback(
                {
                    success: false,
                    data: null,
                    message: "No se encontró ningún registro del usuario solicitado"
                });
            }
            else{
                data = data[0];
                callback(
                    {
                        success: true,
                        data: data,
                        message: ""
                    });
            }
        } 
        else 
        {callback(
            {
                success: false,
                errorCode: 405,
                errorMsg: "No se pudo establecer la conexión a la base de datos"
            });
        }
    });
};

exports.addUser = function(data, callback){
    var validationStatus;
    console.log(data);
    validationStatus = userValidator.validateUsername(data.user);
    if(!validationStatus.success){
        callback(
            {
                success: false,
                data: null,
                message: validationStatus.message
            });
        return;
    }/*
    validationStatus = userValidator.validateDependencyName(data.nombre);
    if(!validationStatus.success){
        callback(
            {
                success: false,
                data: null,
                message: validationStatus.message
            });
        return;
    }
*/
    

    repository.executeQuery({
        spName: 'sp_agregarUsuario',
        params: "\"" + data.usuario + "\", \"" + data.contraseña + "\", \"" + data.cedula + "\", \"" + data.nombre + "\", \"" + data.correo + "\", \"" + data.tipo + "\", \"" + data.activo + "\", \"" + data.fechaInicioAutorizacion + "\", \"" + data.fechaFinalAutorizacion + "\""
    }, 
    function(success, data) {
        if(success) {
            callback(
                {
                    success: true,
                    data: null,
                    message: "El usuario se agregó correctamente"
                });
        } 
        else 
        {callback(
            {
                success: false,
                data: null,
                message: "Por favor asegúrese de que los datos ingresados estén correctos."
            });
        }
    }); 
};

exports.updateUser = function(data, callback){
    var nameStatus = userValidator.validateUsername(data.user);
    if(!nameStatus.success){
        callback(
            {
                success: false,
                data: null,
                message: nameStatus.message
            });
        return;
    }
    repository.executeQuery({
        spName: 'sp_actualizarUsuario',
        params: data.idUsuario + ", \""  + data.usuario + "\", \"" + data.contraseña + "\", \"" + data.cedula + "\", \"" + data.nombre + "\", \"" + data.correo + "\", \"" + data.tipo + "\", \"" + data.activo + "\", \"" + data.fechaInicioAutorizacion + "\", \"" + data.fechaFinalAutorizacion + "\""
    }, 
    function(success, data) {
        if(success) {
            callback(
                {
                    success: true,
                    data: null,
                    message: "El usuario se actualizó correctamente"
                });
        } 
        else 
        {callback(
            {
                success: false,
                data: null,
                message: "Por favor asegúrese de selecionar un usuario antes de actualizar o que el nombre del usuario no está en uso"
            });
        }
    }); 
};