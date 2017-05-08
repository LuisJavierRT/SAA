(function(){
	'use strict';
	angular
		.module("saaApp")
		.factory("FunDepService", ["requestService", function(requestService) {
		
			var doAssign = function(pData) {
				var link = "/funDep";
				return requestService.postRequest({params: "", data: pData}, {url: link}).then(function(result){
	  				return result;
	  			},
	  			function(result){
	  				return result;
	  			});
			};

			return {
				assign: function(pData) {
					return doAssign(pData);
				}
			}
		}]);
})();