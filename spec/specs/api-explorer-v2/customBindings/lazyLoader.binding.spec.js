const ko = require('knockout');
const $ = require('jquery');

window.ko = ko;
window.$ = $;

require('scripts/api-explorer/v2/src/customBindings/lazyLoader.binding.js');

describe("Lazy Loader  binding spec", function(){
	function setFixture () {
		document.body.innerHTML =
			'<div>' +
				'<input id="text-input"/>' +
				'<div id="js_widget_modal_map"></div>' +
				'<div id="js_widget_modal_map__close"></div>' +
			'</div>';
	}

	var element, disposeCallback, fakeClipboard;
	beforeEach(() => {
		setFixture();
	});

	describe('When binding required', () => {
		it('should be defined', () => {
			expect(ko.bindingHandlers.lazyLoader).toBeDefined();
			expect(ko.bindingHandlers.lazyLoader).toEqual({
				init: jasmine.any(Function)
			});
		});
	});


	defineTestForClassificationFields('classificationid', 'id');
	defineTestForClassificationFields('classificationname', 'name');
	defineTestForLazySelectorFields('venueid', 'venues');
	defineTestForLazySelectorFields('attractionid', 'attractions');
	defineTestForDateTimeFields('startDateTime');
	defineTestForDateTimeFields('endDateTime');
	defineTestForDateTimeFields('onsaleStartDateTime');
	defineTestForDateTimeFields('onsaleEndDateTime');

	describe('When initialized for "latlong" field', () => {
		var element, paramsMock;
		beforeEach(() => {
			window.map_latlong = 'map_latlong';
			window.google = { maps : { event: { trigger: jest.fn() }}};
			$.fn.modal = jest.fn();
			element = document.getElementById('text-input');
			paramsMock = {
				name: 'latLong',
				val: ko.observable('defaultVal')
			};
			ko.bindingHandlers.lazyLoader.init(element, ko.observable(paramsMock));
		});

		it('should be insert LatLong button after element', () => {
			expect($('a#js_widget_modal_map__open').size()).toBe(1);
		});

		describe('When clicked on "latLong button"', () => {
			beforeEach(() => {
				$('a#js_widget_modal_map__open').trigger('click');
			});

			it('should be show modal', () => {
				expect($.fn.modal).toBeCalledWith('show');
			});
			it('should triggered resize event for map', () => {
				expect(google.maps.event.trigger).toBeCalledWith(window.map_latlong, 'resize');
			});
		});

		describe('When map modal shown', () => {
			beforeEach(() => {
				$('#js_widget_modal_map').trigger('shown.bs.modal');
			});
			it('should triggered resize event for map', () => {
				expect(google.maps.event.trigger).toBeCalledWith(window.map_latlong, 'resize');
			});
		});
		describe('When map modal close btn clicked', () => {
			it('should be hide modal', () => {
				$('#js_widget_modal_map__close').trigger('click');
				expect($.fn.modal).toBeCalledWith('hide');
			});

			it('should be remove all spaces from input', () => {
				$(element).val('val with spaces');
				$('#js_widget_modal_map__close').trigger('click');
				expect($(element).val()).toBe('valwithspaces')
			});

			it('should be udpate params value', () => {
				$(element).val('check new value');
				$('#js_widget_modal_map__close').trigger('click');
				expect(paramsMock.val()).toBe('checknewvalue');
			});
		});
	});



	function defineTestForDateTimeFields(name){
		describe(`When initialized for "${name}" field`, () => {
			var paramsMock, element;
			beforeEach(() => {
				window.NewCssCal = jest.fn();
				element = document.getElementById('text-input');
				paramsMock = {
					name: name,
					val: ko.observable('defaultVal')
				};
				ko.bindingHandlers.lazyLoader.init(element, ko.observable(paramsMock));
			});

			it('should be insert button after element', () => {
				expect($('button.custom-input__button').size()).toBe(1);
			});

			it('when button clicked should call NewCssCal', () => {
				expect(window.NewCssCal).not.toBeCalled();
				$('button.custom-input__button').trigger('click');
				expect(window.NewCssCal).toBeCalledWith(name, 'yyyyMMdd', 'dropdown', true, '24');
			});

			it('should update value when "onchange" event triggered', () => {
				$(element).val('check new value').trigger('onchange');
				expect(paramsMock.val()).toBe('check new value');
			});
		});
	}

	function defineTestForClassificationFields(name, type){
		describe(`When initialized for "${name}" field`, () => {
			var paramsMock, element;
			beforeEach(() => {
				$.fn.classificationSelector = jest.fn();
				element = document.getElementById('text-input');
				paramsMock = {
					name: name,
					val: ko.observable('defaultVal')
				};
				ko.bindingHandlers.lazyLoader.init(element, ko.observable(paramsMock));
			});

			it('should be called "classificationSelector" method', () => {
				expect($.fn.classificationSelector).toBeCalledWith({"selector": "classifications", "use": type});
			});

			it('should update value when "onchange" event triggered', () => {
				$(element).val('check new value').trigger('change');
				expect(paramsMock.val()).toBe('check new value');
			});
		});
	}

	function defineTestForLazySelectorFields(name, selector){
		describe(`When initialized for "${name}" field`, () => {
			var paramsMock, element;
			beforeEach(() => {
				$.fn.lazySelector = jest.fn();
				element = document.getElementById('text-input');
				paramsMock = {
					name: name,
					val: ko.observable('defaultVal2')
				};
				ko.bindingHandlers.lazyLoader.init(element, ko.observable(paramsMock));
			});

			it('should be called "lazySelector" method', () => {
				expect($.fn.lazySelector).toBeCalledWith({ selector });
			});

			it('should update value when "onchange" event triggered', () => {
				$(element).val('check new value2').trigger('change');
				expect(paramsMock.val()).toBe('check new value2');
			});
		});
	}

});
