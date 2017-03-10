/*
 *Tecnologico de Costa Rica
 *Proyecto de Ingenieria de Software
 *Luis Javier Ramírez Torres
 *Sistema de apoyo administrativo
 *Validador de datos de usuarios
*/
exports.validateUsername = function(user) {
	var informationStatus = {};
	if(user == undefined || user == "undefined") {
		informationStatus.success = false;
		informationStatus.message = 'Usuario inválido';
	}
	else if(user.replace(" ", "").length == 0 ) {
		informationStatus.success = false;
		informationStatus.message = 'Usuario inválido';
	}
	else {
		informationStatus.success = true;
	}
	return informationStatus;
};

exports.validateDates = function(startDate, endDate) {
    var response = {};
    if(startDate <= endDate){
        response.success = true;
    }else{
        response.success = false;
        response.message = "La fecha final no puede ser mayor a la fecha de registro";
    }
    return response;
};

exports.validatePasswords = function(currentPassword, password1, password2) {
	var response = {};
	if(currentPassword == undefined || currentPassword == "undefined" || currentPassword == "") {
		response.success = false;
		response.message = "El campo de la contraseña actual está en blanco";
	}
	else if(password1 == undefined || password1 == "undefined" || password1 == ""){
		response.success = false;
		response.message = "El campo de la nueva contraseña está en blanco";
	}
	else if(password2 == undefined || password2 == "undefined" || password2 == "") {
		response.success = false;
		response.message = "El campo de confirmar la nueva contraseña está en blanco";
	}
	else if (password1 != password2) {
		response.success = false;
		response.message = "Las nuevas contraseñas no coinciden";
	}
	else {
		response.success = true;
	}
	return response;
};

/*
exports.validateDependencyCode = function(code) {
	var informationStatus = {};
	if(code == undefined || code == "undefined") {
		informationStatus.success = false;
		informationStatus.message = 'Código inválido';
	}
	else if(code.replace(" ", "").length == 0 ) {
		informationStatus.success = false;
		informationStatus.message = 'Código inválido';
	}
	else {
		informationStatus.success = true;
	}
	return informationStatus;
};*/