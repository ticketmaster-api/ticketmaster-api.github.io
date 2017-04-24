window.jQuery = window.$ = require('jquery');

window.apiKeyService = {
	getApiKeysCookie : (name)=>{
		var arr =[];
		if(name === "tk-api-apps") {
			arr = [
				{"name":"localhost_staging_widgets","created":"2016-10-04 13:35 PM","key":"OmayHcE8b9GK5nHijxVG3gC5mrv5NLZV"},
				{"name":"portal_staging_widgets","created":"2016-10-04 13:33 PM","key":"TQMbqzKDBbcCjAxC9SaKS1lg9D5Eousb"},
				{"name":"Test Status","created":"2016-12-01 07:41 AM","key":"MbMfOy7je1JGKR3fPYvBMig9crJV0EE4"}
			]
		}
		else arr = [];
		return arr ;
	},
};
require('scripts/components/application-selector.js');
require('scripts/components/custom-select.js');
let setFixture = () => {
	document.body.innerHTML =
		`<input id="js_custom_select_key">
		<input id="w-tm-api-key">
		<input id="api-key">`;
	};

describe("application selector", () => {
	var options , sutElement;
	beforeAll(() => {
		setFixture();
		options = {updateInputs:['#w-tm-api-key','#api-key']};
	});

	it('#applicationSelect should be defined', () => {
		// console.log('jEl', sutElement);
		sutElement = $('#js_custom_select_key').applicationSelect(options);
		expect(sutElement).toBeDefined();
	});

	it('#addValueListener should set "data-value"', () => {
		sutElement = $('#js_custom_select_key').applicationSelect(options);
		$('#w-tm-api-key').blur();
		expect($('#w-tm-api-key').attr('data-value')).toBeDefined();
	});

	it('#updateInputsHandler should not add "data-value"', () => {
		document.body.innerHTML = '';
		setFixture();
		sutElement = $('#js_custom_select_key').applicationSelect();
		$('#w-tm-api-key').blur();
		expect($('#w-tm-api-key').attr('data-value')).toBeUndefined();
	});

	it('should not initialize plugin more than once', () => {
		document.body.innerHTML =
			`<div id="js_custom_select_key">
				<option value="1">
					<select name="1"></select>
					<select name="1"></select>
				</option>
			</div>
		<input id="w-tm-api-key">
		<input id="api-key">`;
		var length = $('#js_custom_select_key').find('select').length;
		sutElement = $('#js_custom_select_key').applicationSelect(options);
		expect(length).toBeGreaterThan(0);
	});


	it('#document should init plugin on ready', () => {
		sutElement = $('#js_custom_select_key').applicationSelect(options);
		$(document).trigger('ready');
		expect(sutElement).toBeDefined();

		/*else path*/
		window.apiKeyService = {
			getApiKeysCookie : (name)=>{
				var arr =[];
				return arr ;
			},
		};
		document.body.innerHTML = '';
		setFixture();
		sutElement = $('#js_custom_select_key').applicationSelect();
		$(document).trigger('ready');
		$('#w-tm-api-key').blur();
		expect($('#w-tm-api-key').attr('data-value')).toBeUndefined();
	});


});
