import module from '../../../../products-and-docs/widgets/countdown/1.0.0/src/main-widget.es6';
let  Clock = module.CountdownClock,
	CDWidget = module.TicketmasterCountdownWidget;

describe("CDWidget", () => {
	let cdwidget ={},
		widgetRoot ;

	beforeEach(function(){
		$('<div w-type="countdown" w-type="countdown" id="toddler"></div>').appendTo('body');
		widgetRoot = document.querySelectorAll("div[w-type='countdown']");
		cdwidget = new CDWidget($("div[w-type='countdown']")[0]);
		// let mockData = {};
	});

	afterEach(function(){
		$('#toddler').remove()
	});

	it('Should be object', () => {
		expect(widgetRoot.length).toBeDefined();
		expect(typeof cdwidget).toBe('object');
	});

	it('Must have version label', () => {
		expect(widgetRoot).not.toBe(null);

		let versionEl = document.querySelectorAll(".tooltip-version")[0];
		expect(cdwidget.widgetVersion).toBeDefined();
		expect(versionEl).toBeDefined();
	});

});
