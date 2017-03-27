var ko = require('knockout');
window.ko = ko;


var AboutMethod = require('scripts/api-explorer/v2/src/components/filter/aboutMethod.component.js');

describe("AboutMethod component spec", function(){
	beforeEach(() => {
		this.paramsMock = {
			selectedMethodData: ko.observable({
				link: 'mockLink',
				name: 'mockName',
				description: 'mockDescription'
			})
		};
		this.component = new AboutMethod(this.paramsMock);
	});

	describe('When component created', () => {
		it('should init data in view model', () => {
			expect(this.component.documentationLink()).toBe('mockLink');
			expect(this.component.name()).toBe('mockName');
			expect(this.component.description()).toBe('mockDescription');
		});
	});

	describe('When selectedMethodData was updated', () => {
		it('should update view model data', () => {
			this.paramsMock.selectedMethodData({
				link: 'mockLink2',
				name: 'mockName2',
				description: 'mockDescription2'
			});
			expect(this.component.documentationLink()).toBe('mockLink2');
			expect(this.component.name()).toBe('mockName2');
			expect(this.component.description()).toBe('mockDescription2');
		});
	});

	describe('When clicked on about button', () => {
		it('should called togglePopUp', () => {
			var togglePopUpResponse = false;
			var model = {
				togglePopUp: jest.fn(() => togglePopUpResponse)
			};
			this.component.onAboutClick(model);
			expect(model.togglePopUp).toBeCalledWith(!togglePopUpResponse);
		});
	});
});
