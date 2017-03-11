var repository = require('../dataAccess/repository.js');
var dependencyValidator = require('./dataValidator/dependencyValidator.js');

exports.allDependencies = function(callback){
    repository.executeQuery({
        spName: 'sp_obtenerDependencias',
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
                    message: "No hay registro de dependencias"
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

exports.dependencyById = function(data, callback){
    repository.executeQuery({
        spName: 'sp_getDependenciaById',
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
                    message: "No se encontró ningún registro de la dependencia solicitada"
                });
            }
            else{
                data = data[0];
                callback(
                {
                    success: true,
                    data: data,
                    message: "Operación exitosa"
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

exports.addDependency = function(data, callback){
    var validationStatus;
    validationStatus = dependencyValidator.validateDependencyCode(data.codigo);
    if(!validationStatus.success){
        callback(
            {
                success: false,
                data: null,
                message: validationStatus.message
            });
        return;
    }
    validationStatus = dependencyValidator.validateDependencyName(data.nombre);
    if(!validationStatus.success){
        callback(
            {
                success: false,
                data: null,
                message: validationStatus.message
            });
        return;
    }

    var paramsString = '\"' + data.codigo + '\"' + ',' + '\"' + data.nombre + '\"';
    repository.executeQuery({
        spName: 'sp_agregarDependencia',
        params: paramsString
    }, 
    function(success, dataQuery) {
        if(success) {
            var paramsString2 = '\"' + data.usuario + '\"' + ',' + '\"' + dataQuery[0][0].id + '\"' + ',' + '\"' + 'i' + '\"';
            repository.executeQuery({
                spName: 'sp_historialGestionDependencia',
                params:  paramsString2
            },
            function(success2, data2) {
                callback(
                {
                    success: true,
                    data: null,
                    message: "La dependencia se agregó correctamente"
                });
            });
        } 
        else 
        {callback(
            {
                success: false,
                data: null,
                message: "Por favor asegúrese de que el codigo o nombre ingresado no está en uso"
            });
        }
    }); 
};

exports.updateDependency = function(data, callback){
    var validationStatus;
    validationStatus = dependencyValidator.validateDependencyCode(data.codigo);
    if(!validationStatus.success){
        callback(
            {
                success: false,
                data: null,
                message: validationStatus.message
            });
        return;
    }
    validationStatus = dependencyValidator.validateDependencyName(data.nombre);
    if(!validationStatus.success){
        callback(
            {
                success: false,
                data: null,
                message: validationStatus.message
            });
        return;
    }
    var paramsString = data.id + ',' + '\"' + data.codigo + '\"' + ',' + '\"' + data.nombre + '\"';
    repository.executeQuery({
        spName: 'sp_actualizarDependencia',
        params: paramsString
    }, 
    function(success, dataQuery) {
        if(success) {
            var paramsString2 = '\"' + data.usuario + '\"' + ',' + '\"' + data.id+ '\"' + ',' + '\"' + 'm' + '\"';
            repository.executeQuery({
                spName: 'sp_historialGestionDependencia',
                params:  paramsString2
            },
            function(success2, data2) {
                callback(
                {
                    success: true,
                    data: null,
                    message: "La dependencia se agregó correctamente"
                });
            });
        } 
        else 
        {callback(
            {
                success: false,
                data: null,
                message: "Por favor asegúrese de selecionar una dependencia antes de actualizar o que el nombre de la dependencia no está en uso"
            });
        }
    }); 
};