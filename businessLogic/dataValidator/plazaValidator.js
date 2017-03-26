var validator = require('validator');

var validatePlazaCode = function(plazaCode) {
    var informationStatus = {};
    if (!plazaCode){
        informationStatus.success = false;
        informationStatus.message = 'Debe ingresar un código para la plaza';
        return informationStatus;
    }
    
    if (plazaCode.length != 6){
        informationStatus.success = false;
        informationStatus.message = 'El código no tiene el formato CX1234';
        return informationStatus;
    }
    var regExp = '[A-Z][A-Z][0-9][0-9][0-9][0-9]';
    var idStatus = validator.matches(plazaCode, regExp); 

    if(idStatus) {
        informationStatus.success = true;
    }
    else {
        informationStatus.success = false;
        informationStatus.message = 'El código no tiene el formato CX1234';
    }
    return informationStatus;
};

var validatePlazaAvailabilityPercentage = function(plazaPerc) {
    var response = {};
    if(plazaPerc > 100){
        response.success = false;
        response.message = "El porcentaje a asignar no puede ser mayor a 100";
    }
    else if(plazaPerc <= 0){
        response.success = false;
        response.message = "El porcentaje a asignar debe ser mayor a 0";
    }else{
        response.success = true;
        response.message = null;
    }

    return response;
};

var validateDates = function(startDate, endDate) {
    var response = {};
    if(startDate <= endDate){
        response.success = true;
    }else{
        response.success = false;
        response.message = "La fecha final no puede ser mayor a la fecha de registro";
    }
    return response;
};

var validateNumberParams = function(programa, numeroAcuerdo) {
    var response = {};
    if(programa <= 0){
        response.success = false;
        response.message = "El número de programa a asignar debe ser mayor a 0";
    }
    else if(numeroAcuerdo <= 0) {
        response.success = false;
        response.message = "El número de acuerdo a asignar debe ser mayor a 0";
    }
    else{
        response.success = true;
        response.message = null;
    }

    return response;
};

exports.validatePlazaData = function(data) {
    var validationResponse = "";

    if (data.codigo){
        validationResponse = validatePlazaCode(data.codigo);
        if (!validationResponse.success){
            return validationResponse;
        }
    }

    validationResponse = validatePlazaAvailabilityPercentage(data.porcentajeCreacion);
    if (!validationResponse.success){
        return validationResponse;
    }
    validationResponse = validateNumberParams(data.programa, data.numeroAcuerdo);
    if(!validationResponse.success) {
        return validationResponse;
    }

    if (data.fechaFinal){
        validationResponse = validateDates(data.fechaAutorizacionInicio, data.fechaAutorizacionFinal);
        return validationResponse;
    }
    else{
        return {
            success: true,
            data: data,
            message: "Validación exitosa"
        };
    }
};
