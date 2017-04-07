const ko = require('knockout');
const $ = require('jquery');
window.ko = ko;
window.$ = $;

var ObjectPanelBody = require('scripts/api-explorer/v2/src/components/panels/objectPanelBody.component.js');

describe("ObjectPanelBody component spec", function(){
	beforeEach(() => {
		Object.getProp = jest.fn(()=> true);
		spyOn($.fn, 'trigger');

		this.paramsMock = {
			data : {
				value: {
					id: 'someId',
					totalPages: 10
				},
				key: 'panelNameMock',
			},
			config: 'config',
			index : ko.observable(5),
			panelGroup : {
				getMore: jest.fn(),
				sortByConfig: 'sortByConfig'
			},
			page: {
				category: 'categoryMock',
				method: 'methodMock',
				methodId: 'methodIdMock',
				params: 'paramsMock',
				pageParam:jest.fn(),
				setParams: jest.fn()
			},
			collapseId : 'collapseIdMock',
			subjectID : ko.observable('subjectIDMock')
		};

		this.component = new ObjectPanelBody(this.paramsMock);

	});

	describe('When component created', () => {
		it('should init data in view model', () => {
			expect(this.component.data()).toBe(this.paramsMock.data.value);
			expect(this.component.config).toBe(this.paramsMock.config);
			expect(this.component._panelName).toBe(this.paramsMock.data.key);
			expect(this.component.cardIndex).toBe(5);
			expect(this.component.panelGroup).toBe(this.paramsMock.panelGroup);
			expect(this.component.getMore).toBe(this.paramsMock.panelGroup.getMore);
			expect(this.component.page).toBe(this.paramsMock.page);
			expect(this.component.collapseId).toBe(this.paramsMock.collapseId);
			expect(this.component._allInside).toBeTruthy();
			expect(this.component.sortByConfig).toBe(this.paramsMock.panelGroup.sortByConfig);
			expect(this.component.subjectID).toBe(this.paramsMock.subjectID);
			expect(Object.getProp).toBeCalledWith(this.paramsMock.config,  '._CONFIG.allInside');
			expect(this.component.subjectID()).toBe(this.paramsMock.data.value.id);
		});
	});

	describe('When changePage called', () => {
		it('should update page', () => {
			this.component.changePage('model', { keyCode: 13, currentTarget: { value: 5 } });
			expect(this.paramsMock.page.pageParam).toBeCalledWith(5);
			expect(this.paramsMock.page.setParams).toBeCalledWith({
				category: this.paramsMock.page.category,
				method: this.paramsMock.page.method,
				methodId: this.paramsMock.page.methodId,
				params: this.paramsMock.page.params
			});
			expect($.fn.trigger).toBeCalledWith('click');
		});

		it('should do nothing if keyCode is not 13', () => {
			this.component.changePage('model', { keyCode: 0 });
			expect(this.paramsMock.page.pageParam).not.toHaveBeenCalled();
			expect(this.paramsMock.page.setParams).not.toHaveBeenCalled();
			expect($.fn.trigger).not.toHaveBeenCalled();
		});
	});
});
