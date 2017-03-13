/*
 *Tecnologico de Costa Rica
 *Proyecto de ingenieria de software
 *Jose Alberto Hidalgo Bonilla
 *Sistema de apoyo administrativo
*/
var repository = require('../dataAccess/repository.js');

var formatDateFromJSToMySQL = function(JSdate){
    return new Date(JSdate).toISOString().substring(0, 10);
};

exports.createFuncionario = function(data, callback){
    var paramsString = '\"'+data.cedula+'\"'+','+
                       '\"'+data.nombre+'\"'+','+
                       '\"'+data.primerApellido+'\"'+','+
                       '\"'+data.segundoApellido+'\"'+','+
                            data.activo+','+
                       '\"'+formatDateFromJSToMySQL(data.fecha)+'\"'+','+
                       '\"'+data.especialidad+'\"';

    repository.executeQuery({
        spName:  'sp_agregarFuncionario',
        params: paramsString
    },
    function(success, dataQuery) {
        if(success) {
            var paramsString2 = '\"'+data.usuarioActual+'\"'+','+
                                dataQuery[0][0].id+','+ '\"' + 'i' + '\"';
            repository.executeQuery({
                spName:  'sp_HistorialGestionFuncionario',
                params: paramsString2
            },
            function(success2, data2) {
                callback({
                    status: true, 
                    message: 'Se ha registrado la informacion del funcionario de manera exitosa',
                    data: dataQuery[0][0].id
                });
            });
        } 
        else {
            callback({
                status: false, 
                message: 'Ha ocurrido un error, no se ha registrado el funcionario',
                data: {}
            });
        }
    });    
};

exports.createAcademicInfo = function(data, callback){
    var paramsString = 		data.id+','+
    				   '\"'+data.params.titulo+'\"'+','+
                       '\"'+data.params.universidad+'\"'+','+
                       '\"'+data.params.grado+'\"'+','+
                       '\"'+formatDateFromJSToMySQL(data.params.annoGraduacion).substring(0,4)+'\"';
    repository.executeQuery({
        spName:  'sp_agregarTitulo',
        params: paramsString
    },
    function(success, data) {
        if(success) {
            callback({
                status: true, 
                message: 'Se ha registrado la informacion academica del funcionario de manera exitosa',
                data: {}
            });
        } 
        else {
            callback({
                status: false, 
                message: 'Ha ocurrido un error, no se ha registrado la informacion academica del funcionario',
                data: {}
            });
        }
    });    
};

exports.createAntecedentesFuncionario = function(data, callback){
    var paramsString = data.id + ',' +	'\"'+data.params.descripcion+'\"';
    repository.executeQuery({
        spName:  'sp_agregarAntecedente',
        params: paramsString
    },
    function(success, data) {
        if(success) {
            callback({
                status: true, 
                message: 'Se ha registrado la descripcion de antecedentes del funcionario de manera exitosa',
                data: {}
            });
        } 
        else {
            callback({
                status: false, 
                message: 'Ha ocurrido un error, no se ha registrado los antecedentes del funcionario',
                data: {}
            });
        }
    });    
};
