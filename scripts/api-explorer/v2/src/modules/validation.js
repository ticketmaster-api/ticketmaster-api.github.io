require('knockout.validation');

ko.validation.rules.pattern.message = 'Invalid.';

ko.validation.init({
	registerExtenders: true,
	messagesOnModified: true,
	decorateInputElement: true,
	errorMessageClass: 'custom-input__validation-message',
	errorElementClass: 'not-valid',
	insertMessages: false,
	parseInputAttributes: true,
	messageTemplate: null,
	grouping: {
		deep: true,
		live: true,
		observable: true
	}
}, true);

ko.validation.rules['nullableInt'] = {
	validator: function (val, validate) {
		return val === null || val === "" || val === 0 || (validate && /^-?\d*$/.test(val.toString()));
	},
	message: 'Must be empty or an integer value'
};

ko.validation.rules['nullableDecimal'] = {
	validator: function (val, validate) {
		return val === null || val === "" || (validate && /^-?\d*(?:\.\d*)?$/.test(val.toString()));
	},
	message: 'Must be empty or a decimal value'
};

ko.validation.registerExtenders();
