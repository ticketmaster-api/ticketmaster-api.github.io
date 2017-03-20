/*
import module from 'products-and-docs/widgets/countdown/1.0.0/src/main-widget.es6';
let  Clock = module.CountdownClock,
	CDWidget = module.TicketmasterCountdownWidget;

describe("CDWidget", () => {
	let cdwidget = CDWidget.prototype,
	 fetchedBar;

	beforeEach(function() {
		spyOn(cdwidget,'isUniverseUrl');
		cdwidget.isUniverseUrl("http://www.ticketmaster.com/event/");
		fetchedBar = cdwidget.isUniverseUrl("http://www.ticketmaster.com/event/");
	});

	it('Should be object', () => {
		expect(cdwidget.widgetVersion).toBeDefined();
		expect(typeof cdwidget).toBe('object');
	});

	it('Should have version label', () => {
		expect(cdwidget.widgetVersion).toBeDefined();
		expect(typeof cdwidget.widgetVersion).toBe('string');
	});

	it('Should called "isUniverseUrl"', () => {
		expect(cdwidget.isUniverseUrl).toHaveBeenCalledWith("http://www.ticketmaster.com/event/");
	});
});
*/
describe("CDWidget", () => {
	it('Do nothing', () => {
		// JEST required minimum 1 test in spec file
	});
});
