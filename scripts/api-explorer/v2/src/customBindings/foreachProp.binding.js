 module.exports = ko.bindingHandlers.foreachprop = {

	transformObject: function (params) {
		var properties = [];
		var obj, sortFn = params.sortFn;

		obj = sortFn ? params.data: params;
		obj = ko.utils.unwrapObservable(obj);

		ko.utils.objectForEach(obj, function (key, value) {
			properties.push({
				key: key,
				value: value
			});
		});

		if (sortFn) {
			properties.sort(sortFn);
		}

		return properties;
	},
	init: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
		var properties = ko.pureComputed(function () {
			var obj = ko.utils.unwrapObservable(valueAccessor());
			return ko.bindingHandlers.foreachprop.transformObject(obj);
		});
		ko.applyBindingsToNode(element, {
			foreach: properties
		}, bindingContext);
		return {
			controlsDescendantBindings: true
		};
	}
};
