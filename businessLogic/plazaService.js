var repository = require('../dataAccess/repository.js');
var plazaValidator = require('./dataValidator/plazaValidator.js');

var formatDateFromJSToMySQL = function(JSdate){
    return new Date(JSdate).toISOString().substring(0, 10);
};

exports.addPlaza = function(data, callback){
    data.fechaAutorizacionInicio = formatDateFromJSToMySQL(data.fechaAutorizacionInicio);
    if (data.fechaAutorizacionFinal != undefined){
        data.fechaAutorizacionFinal = formatDateFromJSToMySQL(data.fechaAutorizacionFinal);
    }

    var response = plazaValidator.validatePlazaData(data);
	if (!response.success){
        callback(response);
        return;
    }
    var sp_params = "\"" + data.descripcion + "\"," + "\"" + data.codigo + "\"";
    repository.executeQuery({
        spName: 'sp_agregarPlaza',
        params: sp_params
    }, 
    function(success, dataQuery) {
        if(success) {
        	if(dataQuery[0][0].valid == 0) {
        		callback(
	            {
	                success: false,
	                message: "Ya existe una plaza con ese código",
	                data: null
	            });
        	}

            else{
                var paramsString2 = '\"'+data.usuarioActual+'\"'+','+
                                        dataQuery[0][0].valid+','+ '\"' + 'i' + '\"';
                repository.executeQuery({
                    spName:  'sp_HistorialGestionPlaza',
                    params: paramsString2
                }, 
                function(success2, data2) {
                    callback({
                        success: true, 
                        message: "La plaza se agregó correctamente",
                        data: dataQuery[0][0].valid
                    });
                });
                

            }
        } 
        else 
        {
        	callback(
            {
                success: false,
                data: null,
                message: "No se pudo agregar la plaza, por favor verifique todos los campos"
            });
        }
    });        
};

exports.addPlazaInfo = function(data, callback) {
	data.fechaAutorizacionInicio = formatDateFromJSToMySQL(data.fechaAutorizacionInicio);
	data.fechaAutorizacionFinal = formatDateFromJSToMySQL(data.fechaAutorizacionFinal);
	data.fechaAcuerdo = formatDateFromJSToMySQL(data.fechaAcuerdo);

	var sp_params = data.idPlaza + "," + "\"" + data.codigo + "\"" + "," + data.periodo + "," +
					data.programa + "," + "\"" + data.tipo + "\"" + "," + data.categoria + "," +
					"\"" + data.puesto + "\"" + "," +  data.jornada + "," + "\"" + data.fechaAutorizacionInicio + "\"" + "," +
					"\"" + data.fechaAutorizacionFinal + "\"" + "," + data.articulo + "," + "\"" + data.numeroSesion + "\"" + "," +
					"\"" + data.fechaAcuerdo + "\"" + "," + data.tce;
    repository.executeQuery({ 
        spName: 'sp_agregarCaracteristicaPlaza',
        params: sp_params
    }, 
    function(success, dataQuery) {
        if(success) {
            callback(
            {
                success: true,
                message: "La información de la plaza se agregó correctamente",
                data: null
            });
        } 
        else 
        {
        	callback(
            {
                success: false,
                data: null,
                message: "No se pudo agregar la información de la plaza, por favor verifique todos los campos"
            });
        }
    });
};


exports.updatePlaza = function(data, callback){
    data.fechaAutorizacionInicio = formatDateFromJSToMySQL(data.fechaAutorizacionInicio);
    data.fechaAcuerdo = formatDateFromJSToMySQL(data.fechaAcuerdo);
    if (data.fechaAutorizacionFinal != undefined){
        data.fechaAutorizacionFinal = formatDateFromJSToMySQL(data.fechaAutorizacionFinal);
    }

    var response = plazaValidator.validatePlazaData(data);
    if (!response.success){
        callback(response);
        return;
    }
    var sp_params = data.id + ","+ data.idcp + "," + "\"" + data.codigo + "\"" + "," + "\"" + data.descripcion + "\"" + "," + data.periodo + "," +
                    data.programa + "," + "\"" + data.tipo + "\"" + "," + data.categoria + "," +
                    "\"" + data.puesto + "\"" + "," +  data.jornada + "," + "\"" + data.fechaAutorizacionInicio + "\"" + "," +
                    "\"" + data.fechaAutorizacionFinal + "\"" + "," + data.articulo + "," + "\"" + data.numeroSesion + "\"" + "," +
                    "\"" + data.fechaAcuerdo + "\"" + "," + data.tce;
    repository.executeQuery({
        spName: 'sp_actualizarPlaza',
        params: sp_params
    }, 
    function(success, dataQuery) {
        if(success) {
            if(dataQuery[0][0].valid == 0) {
                callback(
                {
                    success: false,
                    message: "Ya existe una plaza con ese código",
                    data: null
                });
            }

            else{
                var paramsString2 = '\"'+data.usuarioActual+'\"'+','+
                                        data.id+','+ '\"' + 'm' + '\"';
                repository.executeQuery({
                    spName:  'sp_HistorialGestionPlaza',
                    params: paramsString2
                }, 
                function(success2, data2) {
                    callback({
                        success: true, 
                        message: "La plaza se actualizó correctamente",
                        data: null
                    });
                });
            }
        } 
        else 
        {
            callback(
            {
                success: false,
                data: null,
                message: "No se pudo actualizar la plaza, por favor verifique todos los campos"
            });
        }
    });        
};


exports.getAllPlazas = function(callback){
    repository.executeQuery({
        spName: 'sp_obtenerPlazas',
        params: ''
    }, 
    function(success, data) {
        if(success) {
            data = data[0];
            if(data.length > 0) {
                callback({
                    success: true, 
                    message: 'Se ha obtenido la lista de plazas de manera exitosa',
                    data: data
                });
            }
            else {
                callback({
                    success: false, 
                    message: 'No se han encontrado plazas registradas activas',
                    data: {}
                });
            }
        } 
        else {
            callback({
                success: false, 
                message: 'Ha ocurrido un error, no se ha obtenido la lista de plazas',
                data: {}
            });
        }
    });    
};

exports.getPlaza = function(data, callback){
    repository.executeQuery({
        spName: 'sp_obtenerPlaza',
        params: data.id
    }, 
    function(success, data) {
        if(success) {
            data = data[0];
            if(data.length > 0) {
                callback({
                    success: true, 
                    message: 'Se ha obtenido la información de la plaza de manera exitosa',
                    data: data[0]
                });
            }
            else {
                callback({
                    success: false, 
                    message: 'La plaza no se encuentra registrada',
                    data: {}
                });
            }
        } 
        else {
            callback({
                success: false, 
                message: 'Ha ocurrido un error, no se ha obtenido la plaza correspondiente',
                data: {}
            });
        }
    });    
};

exports.getCategorias = function(callback){
    repository.executeQuery({
        spName: 'sp_obtenerCategoriasPlaza',
        params: ''
    }, 
    function(success, data) {
        if(success) {
            data = data[0];
            if(data.length > 0) {
                callback({
                    success: true, 
                    message: 'Se ha obtenido las categorías de las plazas de manera exitosa',
                    data: data
                });
            }
            else {
                callback({
                    success: false, 
                    message: 'No hay categorías para las plazas registradas',
                    data: {}
                });
            }
        } 
        else {
            callback({
                success: false, 
                message: 'Ha ocurrido un error, no se ha obtenido las categorías de las plazas',
                data: {}
            });
        }
    });    
};

exports.getPuestos = function(callback){
    repository.executeQuery({
        spName: 'sp_obtenerPuestosPlaza',
        params: ''
    }, 
    function(success, data) {
        if(success) {
            data = data[0];
            if(data.length > 0) {
                callback({
                    success: true, 
                    message: 'Se ha obtenido los puestos de las plazas de manera exitosa',
                    data: data
                });
            }
            else {
                callback({
                    success: false, 
                    message: 'No hay puestos para las plazas registradas',
                    data: {}
                });
            }
        } 
        else {
            callback({
                success: false, 
                message: 'Ha ocurrido un error, no se ha obtenido los puestos de las plazas',
                data: {}
            });
        }
    });    
};