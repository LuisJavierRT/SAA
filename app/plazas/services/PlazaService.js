(function() {
	"use strict";
	angular
		.module("saaApp")
		.service("PlazaService", ["requestService", function(requestService) {
			var addP = function(pData) {
				var link = "/plazas";
				return requestService.postRequest({params: "", data: pData}, {url: link}).then(function(result){
	  				return result;
	  			},
	  			function(result){
	  				return result;
	  			});
			};

			var addPI = function(pData) {
				var link = "/plazasInfo";
				return requestService.postRequest({params: "", data: pData}, {url: link}).then(function(result){
	  				return result;
	  			},
	  			function(result){
	  				return result;
	  			});
			};

			return {
				addPlaza: function(pData) {
					return addP(pData);
				},
				addPlazaInfo: function(pData) {
					return addPI(pData);
				}
			};
		}]);
})();