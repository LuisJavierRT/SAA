var plazaService = require("../businessLogic/plazaService.js");

exports.addPlaza = function(pRequest, pResponse) {
	var data = plazaService.addPlaza(pRequest.body, function(data) {
        pResponse.send(data);
    });
};

exports.addPlazaInfo = function(pRequest, pResponse) {
	var data = plazaService.addPlazaInfo(pRequest.body, function(data) {
        pResponse.send(data);
    });
};