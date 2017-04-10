const ko  = require('knockout');
window.ko = ko;

describe("Block Ellipsis binding spec", function(){
	beforeAll(()=>{
		require('scripts/api-explorer/v2/src/customBindings/blockEllipsis.binding.js');
	});

	describe('When binding required', () => {
		it('should be defined', () => {
			expect(ko.bindingHandlers.blockEllipsis).toBeDefined();
			expect(ko.bindingHandlers.blockEllipsis).toEqual({
				init: jasmine.any(Function)
			})
		});
	});


	describe('When init called', () => {
		it('should be call $clamp function', () => {
			window.$clamp = jest.fn();
			ko.bindingHandlers.blockEllipsis.init(
				'element',
				()=> 'valueAccessor',
				'allBindings',
				'viewModel',
				'bindingContext');
			expect(window.$clamp).toBeCalledWith('element', 'valueAccessor');
		});
	});
});
