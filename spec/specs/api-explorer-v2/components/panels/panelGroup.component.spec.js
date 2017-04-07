const ko = require('knockout');
const $ = require('jquery');
window.ko = ko;
window.$ = $;

var PanelGroup = require('scripts/api-explorer/v2/src/components/panels/panelGroup.component.js');

describe("PanelGroup component spec", function() {

	beforeEach(() => {
		Object.getProp = jest.fn(() => true);
		this.paramsMock = {
			groupIndex:1,
			sectionIndex: ko.observable(5),
			deepProp: 'deepProp',
			config: {
				_CONFIG:{
					index: 2,
					unwrapp: ['unwrapVal'],
					deprecated: ['deprecated1', 'deprecated3']
				},
				otherPanelCfg: {
					_CONFIG: {
						index: 1
					}
				},
				otherPanelCfg2: {
					_CONFIG: {
						index: 3
					}
				}
			},
			filter: ko.observable({
				_GLOBAL_CONFIG: {
					name: 'global',
					globalVal: 'someGlobalVal'
				},
				methodIdMock: {
					_CONFIG: {
						name: 'methodFilterCFG',
						someLocalVal: 'soveLocalVal'
					}
				}
			}),
			data: {
				someDataProperty: 'someValue',
				deprecated1: 'deprecated1',
				deprecated2: 'deprecated2',
				unwrapVal: {
					someWrappedProperty: 123
				},
				page: {
					size: 10
				}
			},
			pageParam: {
				value: 5
			},
			category: 'categoryMock',
			method: 'methodMock',
			methodId: 'methodIdMock',
			params: {
				somePageParam: 12
			},
			setParams:'setParamsMock'
		};

		this.component = new PanelGroup(this.paramsMock);


	});

	describe('When component created', () => {
		it('should init data in view model', () => {
			expect(this.component.config).toBe(this.paramsMock.config);
			expect(this.component.data).toEqual({
				object:{
					deprecated2: 'deprecated2',
					"someDataProperty": "someValue",
					"someWrappedProperty": 123
				},
				"page": {"size": 10}});
			expect(this.component.groupIndex).toBe(this.paramsMock.groupIndex);
			expect(this.component.page).toEqual({
				"category": "categoryMock",
				"method": "methodMock",
				"methodId": "methodIdMock",
				"pageParam": 5,
				"params": {
					"somePageParam": 12
				},
				"setParams": "setParamsMock",
				"size": 10
			});
			expect(this.component.collapseId).toBe('card-panel-body-51');
			expect(this.component._hasEventsPanel).toBeFalsy();
		});

		it('should make config from "filter" param if config in params absent',() => {
			var paramsMock = { ...this.paramsMock, config: null, deepProp: null };
			var component = new PanelGroup(paramsMock);
			expect(component.config).toEqual({"_CONFIG": {"globalVal": "someGlobalVal", "name": "methodFilterCFG", "someLocalVal": "soveLocalVal"}});
		});

	});

	describe('When checkIfHasEventsList called', () => {
		it('should check input key and update "_hasEventsPanel" value', () => {
			expect(this.component.checkIfHasEventsList('test')).toBeFalsy();
			expect(this.component._hasEventsPanel).toBeFalsy();

			expect(this.component.checkIfHasEventsList('events')).toBeTruthy();
			expect(this.component._hasEventsPanel).toBeTruthy();

			expect(this.component.checkIfHasEventsList('test')).toBeTruthy();
			expect(this.component._hasEventsPanel).toBeTruthy();
		});
	});

	describe('When method sortByConfig called', () => {
		it('should compare indexes in config', () => {
			expect(this.component.sortByConfig({key:'otherPanelCfg'}, {key:'otherPanelCfg2'})).toBe(-2);
			expect(this.component.sortByConfig({key:'otherPanelCfg2'}, {key:'otherPanelCfg'})).toBe(2);
			expect(this.component.sortByConfig({key:'nonExist'}, {key:'otherPanelCfg'})).toBe(0);
			expect(this.component.sortByConfig({key:'otherPanelCfg'}, {key:'nonExist'})).toBe(0);
			expect(this.component.sortByConfig({key:'nonExist'}, {key:'nonExist2'})).toBe(0);
		});
	});
});
