 module.exports = ko.bindingHandlers.foreachprop = {
	transformObject: function (obj) {
		var properties = [];
		ko.utils.objectForEach(obj, function (key, value) {
			properties.push({ key: key, value: value });
		});
		return properties;
	},
	init: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
		var properties = ko.pureComputed(function () {
			var obj = ko.utils.unwrapObservable(valueAccessor());
			return ko.bindingHandlers.foreachprop.transformObject(obj);
		});
		ko.applyBindingsToNode(element, { foreach: properties }, bindingContext);
		return { controlsDescendantBindings: true };
	}
};
