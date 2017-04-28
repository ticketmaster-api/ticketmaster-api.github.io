const ko  = require('knockout');
window.ko = ko;

describe("Classifications Map binding spec", function(){
	beforeAll(()=>{
		require('scripts/api-explorer/v2/src/customBindings/classificationsMap.binding.js');
	});

	describe('When binding required', () => {
		it('should be defined', () => {
			expect(ko.bindingHandlers.classificationsMap).toBeDefined();
			expect(ko.bindingHandlers.classificationsMap).toEqual({
				init: jasmine.any(Function)
			})
		});
	});


	describe('When init called', () => {
		it('should be initialized', () => {
			var valueAccessor = jest.fn();
			var allBindings = jest.fn();

			ko.bindingHandlers.classificationsMap.init(
				'element',
				valueAccessor,
				allBindings,
				'viewModel',
				'bindingContext');

			expect(valueAccessor).toBeCalled();
			expect(allBindings).toBeCalled();
		});
	});
});
