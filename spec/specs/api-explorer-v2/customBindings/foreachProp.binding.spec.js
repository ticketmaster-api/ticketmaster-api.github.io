const ko  = require('knockout');
window.ko = ko;
require('scripts/api-explorer/v2/src/customBindings/foreachProp.binding.js');

describe("Classifications Map binding spec", function(){

	describe('When binding required', () => {
		it('should be defined', () => {
			expect(ko.bindingHandlers.foreachprop).toBeDefined();
			expect(ko.bindingHandlers.foreachprop).toEqual({
				init: jasmine.any(Function),
				transformObject: jasmine.any(Function)
			});
		});
	});

	describe('When init called', () => {
		var element= 'element',
			valueAccessor = () => ko.observable({
				sortFn: (a, b) => {
					if ( a.key < b.key )
						return 1;
					if ( a.key > b.key )
						return -1;
					return 0;
				},
				data: {
					key1: 'value1',
					key2: 'value2',
					key3: 'value3'
				}
			}),
			allBindingsAccessor = 'allBindingsAccessor',
			viewModel = 'viewModel',
			bindingContext = 'bindingContext';

		beforeEach(()=>{
			ko.applyBindingsToNode = jest.fn();
			ko.bindingHandlers.foreachprop.init(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext);
		});

		it('should be apply bindings', () => {
			expect(ko.applyBindingsToNode).toBeCalledWith(element, {
				foreach:jasmine.any(Function)
			}, bindingContext);
		});

		it('should calculate properties', () => {
			expect(ko.applyBindingsToNode.mock.calls[0][1].foreach()).toEqual([{
				"key": "key3",
				"value": "value3"
			}, {
				"key": "key2",
				"value": "value2"
			}, {
				"key": "key1",
				"value": "value1"
			}]);
		});
	});
});
