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