const ko = require('knockout');
const $ = require('jquery');
window.ko = ko;
window.$ = $;

var ArrayPanelBody = require('scripts/api-explorer/v2/src/components/panels/arrayPanelBody.component.js');

describe("ArrayPanelBody component spec", function(){
	var setFixture = () => {
		document.body.innerHTML =
			'<div class="slick-slide">' +
				'<div id="control-1" class="item object active"></div>' +
				'<div id="control-2" class="item object active"></div>' +
				'<div id="control-3" class="item object">' +
				   '<div id="target"></div>' +
			  '</div>' +
			'</div>';
	};

	beforeEach(() => {
		setFixture();
		this.paramsMock = {
			data: {
				key: 'panelName',
				value:[1, 2, 3]
			},
			config: 'configMock',
			panelGroup: {
				getMore: jest.fn()
			},
			index: ko.observable(5)
		};
		this.component = new ArrayPanelBody(this.paramsMock);
	});

	describe('When component created', () => {
		it('should init data in view model', () => {
			expect(this.component.data).toBe(this.paramsMock.data.value);
			expect(this.component.config).toBe(this.paramsMock.config);
			expect(this.component._panelName).toBe(this.paramsMock.data.key);
			expect(this.component.cardIndex).toBe(5);
			expect(this.component.panelGroup).toBe(this.paramsMock.panelGroup);
			expect(this.component.getMore).toBe(this.paramsMock.panelGroup.getMore);
		});
	});

	describe('When getStartData method called', () => {
		it('should called Object.getProp', () => {
			Object.getProp = jest.fn();
			this.component.getStartData('inputData');
			expect(Object.getProp).toBeCalledWith('inputData', 'dates.start.localDate');
		});
	});

	describe('When getVenueName method called', () => {
		it('should called Object.getProp', () => {
			Object.getProp = jest.fn();
			this.component.getVenueName('inputParam');
			expect(Object.getProp).toBeCalledWith('inputParam', '_embedded.venues[0].name');
		});
	});

	describe('When setActive method called', () => {
		it('should remove "active" css class from other items and set "active" on current', () => {
			this.component.setActive('$index', 'model', { currentTarget: $('#target') });
			expect($('#control-1').hasClass('active')).toBeFalsy();
			expect($('#control-2').hasClass('active')).toBeFalsy();
			expect($('#control-3').hasClass('active')).toBeTruthy();
		});

		it('should remove "active" css class from other items and set "active" on current', () => {
			this.component.setActive(null, null, { currentTarget: $('#target') });
			expect($('#control-1').hasClass('active')).toBeFalsy();
			expect($('#control-2').hasClass('active')).toBeFalsy();
			expect($('#control-3').hasClass('active')).toBeTruthy();
		});

		it('should call getMore from panelGroup', () => {
			this.component.setActive('$index', 'model', { currentTarget: $('#target') });
			expect(this.paramsMock.panelGroup.getMore).toBeCalledWith({panel: this.component, id: '$index', data: 'model'});
		});
	});
});
