var funDepService = require('../businessLogic/funDepService');


exports.assignFunDep = function(dRequest, dResponse) {
    var data = funDepService.assignFunDep(dRequest.body, function(data){
        dResponse.send(data);
    });
};
