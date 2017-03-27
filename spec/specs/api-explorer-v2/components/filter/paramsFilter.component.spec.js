const ko = require('knockout');
const $ = require('jquery');

window.ko = ko;
window.$ = $;

var ParamsFilter = require('scripts/api-explorer/v2/src/components/filter/paramsFilter.component.js');


describe('ParamsFilter component spec', function() {

	var methodData = {
		id: 'method1',
		name: 'method 1',
		link: 'method 1 link',
		parameters: {
			id: {
				name: 'id',
				select: false,
				default:'defaultId'
			},
			format: {
				name: 'format',
				select: true,
				default: 'json',
				options: [{
					checked:true,
					name: 'json'
				}]
			},
			endDateTime: {
				name: 'endDateTime',
				select: false
			},
			venueId: {
				name: 'venueId',
				default: 'defaultVenueID',
				select: false
			}
		}
	};

	var methodData2 = {
		parameters:{
			id: {
				name: 'id',
				select: false
			},
			someParam: {
				name: 'someParam',
				select: false
			}
		}
	};

	beforeEach(() => {
		this.paramsMock = {
			selectedMethod: ko.observable(),
			selectedParams: ko.observableArray([]),
			selectedMethodData: ko.observable(methodData),
			animationSpeed: 500,
			paramsIsHiden: ko.observable()
		};
		this.component = new ParamsFilter(this.paramsMock);
	});

	describe('When component created', () => {
		it('should init paramsModel array', () => {
			expect(this.component.paramsModel()).toEqual([{
					"hasCalendar": false,
					"hasPopUp": false,
					"name": "id",
					"default": "defaultId",
					"select": false,
					"value": jasmine.any(Function)
				},{
					"hasCalendar": false,
					"hasPopUp": false,
					"name": "format",
					"select": true,
				  "default": "json",
					"options": jasmine.any(Function),
					"value": jasmine.any(Function)
				},{
					"hasCalendar": true,
					"hasPopUp": false,
					"name": "endDateTime",
					"select": false,
					"value": jasmine.any(Function)
				},{
					"hasCalendar": false,
					"hasPopUp": true,
					"name": "venueId",
					"default": "defaultVenueID",
					"select": false,
					"value": jasmine.any(Function)
				}]);
		});
	});

	describe('When selectedMethod updated', () => {
		it('should update paramsModel', () => {
			this.paramsMock.selectedMethodData(methodData2);
			this.paramsMock.selectedMethod('GET');
			expect(this.component.paramsModel()).toEqual([{
					"hasCalendar": false,
					"hasPopUp": false,
					"name": "id",
					"select": false,
					"value": jasmine.any(Function)
				},{
					"hasCalendar": false,
					"hasPopUp": false,
					"name": "someParam",
					"select": false,
					"value": jasmine.any(Function)
				}]);
		});
	});

	describe('When selectedParams updated', () => {
		it('should update paramsModel values', () => {
			this.paramsMock.selectedParams.notifySubscribers([{
				name: 'id',
				value: 'selectedId'
			},{
				name: 'venueId',
				value: 'selectedVenueId'
			}], 'paramsSet');


			expect(this.component.paramsModel()[0].value()).toBe('selectedId');
			expect(this.component.paramsModel()[1].value()).toBe('json');
			expect(this.component.paramsModel()[2].value()).toBe('');
			expect(this.component.paramsModel()[3].value()).toBe('selectedVenueId');
		});
	});

	describe('When paramsIsHiden changed', () => {
		it('should update isHidden value', () => {
			$.fn.slideToggle = function(speed, callback){
					callback();
			};
			this.paramsMock.paramsIsHiden(true);
			expect(this.component.isHidden()).toBeFalsy();
			this.paramsMock.paramsIsHiden(false);
			expect(this.component.isHidden()).toBeTruthy();
		});
	});

	describe('When onFocus called', () => {
		it('should update paramInFocus', () => {
			this.component.onFocus('onFocusMockItem');
			expect(this.component.paramInFocus()).toBe('onFocusMockItem');
		});
	});

	describe('When onParamsClear called', () => {
		it('should set params values to default', () => {
			this.component.paramsModel()[0].value('newValue');
			this.component.paramsModel()[1].value('newValue');
			this.component.paramsModel()[2].value('newValue');
			this.component.paramsModel()[3].value('newValue');

			this.component.onParamsClear();


			expect(this.component.paramsModel()[0].value()).toBe('');
			expect(this.component.paramsModel()[1].value()).toBe('json');
			expect(this.component.paramsModel()[2].value()).toBe('');
			expect(this.component.paramsModel()[3].value()).toBe('');
		});
	});


	describe('When onSelectParamValue called', () => {
		it('should update this params value', () => {
			var paramMock = {
				value: ko.observable()
			};
			this.component.onSelectParamValue(paramMock, { value: 'someValue' });
			expect(paramMock.value()).toBe('someValue');

			this.component.onSelectParamValue(paramMock, { name: 'someName' });
			expect(paramMock.value()).toBe('someName');

		});
	})

});
