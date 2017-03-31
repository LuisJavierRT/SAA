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
					"\"" + data.puesto + "\"" + "," +  data.porcentajeCreacion + "," + "\"" + data.fechaAutorizacionInicio + "\"" + "," +
					"\"" + data.fechaAutorizacionFinal + "\"" + "," + data.articulo + "," + "\"" + data.numeroAcuerdo + "\"" + "," +
					"\"" + data.fechaAcuerdo + "\"";

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