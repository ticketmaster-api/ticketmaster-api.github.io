(function () {

	var listApiKeys = apiKeyService.getApiKeysCookie("tk-user-roles");
	function redirect(listApiKeys) {
		var x = 'internal.html';

		if(listApiKeys && listApiKeys.indexOf("Internal User") !== -1) {
			if (location.href.indexOf(x) !== -1) return;
			location.assign(location.href + x);
		}else if(location.href.indexOf(x) !== -1){
			location.assign(location.href.replace(x,''));
		}
	}

	redirect(listApiKeys);

	// CommonJS exports
	if (typeof module !== "undefined") {
		module.exports = { redirect: redirect };
	}

})();


