// Global service object
var simpleFormService = {};

(function () {
	simpleFormService.checkKey = function (formKey, formKeyCC) {
		var localhost = /(localhost:4000|127\.0\.0\.1)+/ig,
			staging = 'ticketmaster-api-staging.github.io',
			host = window.location.host;
		if (localhost.test(host) || staging.test(host)) {
			formKey = '3d9f2df7bef3e8bc5d9323cbea36f4d0'; 
			formKeyCC = '3d9f2df7bef3e8bc5d9323cbea36f4d0';
		}
		return [formKey, formKeyCC]
	};
})();

