/*
 *Tecnologico de Costa Rica
 *Proyecto de ingenieria de software
 *Jose Hidalgo Bonilla
 *Sistema de apoyo administrativo
 *Controlador de sesion
*/
var userService   = require('../businessLogic/userService.js'),
    //sessionValidator = require('../businessLogic/dataValidator/sessionDataValidator.js');

exports.getAllUsers = function(dRequest, dResponse) {
    var data = userService.allUsers(function(data){
        dResponse.send(data);
    });
};

exports.getUserById = function(dRequest, dResponse) {
    console.log(dRequest);
    var data = userService.userById(dRequest.params, function(data){
        dResponse.send(data);
    });
};

exports.addUser= function(dRequest, dResponse) {
    var data = userService.addUser(dRequest.body, function(data) {
        dResponse.send(data);
    });
};

exports.updateUser= function(dRequest, dResponse) {
    var data = userService.updateUser(dRequest.body, function(data) {
        dResponse.send(data);
    });
};