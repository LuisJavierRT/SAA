(function(){
	'use strict'
	angular
		.module("saaApp")
		.factory("DependenciaService", ["RequestService", function(requestService) {
			var getDepen = function() {
				var link = "/dependencies";
				return requestService.getRequest({params: ""}, {url: '/dependencies'}).then(function(result){
	  				return result;
	  			},
	  			function(res){
	  				return result;
	  			});
			};

			var addDepen = function(pData) {
				var link = "/dependencies";
				return requestService.postRequest({params: "", data: pData}, {url: '/dependencies'}).then(function(result){
	  				return result;
	  			},
	  			function(res){
	  				return result;
	  			});
			};

			var editDepen = function(pData) {
				var link = "/dependencies/";
				return requestService.putRequest({params: pData.idDependencia, data: pData}, {url: '/dependencies/'}).then(function(result){
	  				return result;
	  			},
	  			function(res){
	  				return result;
	  			});
			};

			return {
				getDependecies: function() {
					return getDepen();
				},
				addDependency: function(pData) {
					return addDepen(pData); 
				},
				editDependency: function(pData) {
					return editDepen(pData);
				}
			}
		}]);
})();