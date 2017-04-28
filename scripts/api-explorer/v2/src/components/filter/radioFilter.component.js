var self;

function RadioFilter(params) {
	self = this;
	var selectedCategory = ko.unwrap(params.selectedCategory);
	var data = params.data;
	this.selectedMethodType = params.selectedMethodType;
	this.RADIO_ID = 'api-exp-';

	this.radiosModel = ko.observableArray([]);
	this.updateRadiosModel(data[selectedCategory]);

	params.selectedCategory.subscribe(function (val) {
		this.updateRadiosModel(data[val]);
	}, this);
}

RadioFilter.prototype.updateRadiosModel = function (param) {
	var obj = param || {},
		arr = [];

	for (var i in obj) {
		if (!obj.hasOwnProperty(i) || /^__/g.test(i)) { continue; } // exclude all fields that begin from '__' - this will be service fields
		var item = {
			checked: ko.observable(i === 'ALL'),
			name: i
		};
		arr.push(item);
		// initial notify for all subscribers
		i === 'ALL' && this.selectedMethodType.notifySubscribers(i);
	}

	arr = arr.sort(compareMethods);
	this.radiosModel(arr);
	return arr;
};

/**
 * Onchange handler for Radio buttons
 * @param item
 */
RadioFilter.prototype.onchangeRadios = function (item) {
	var radiosModel = ko.unwrap(self.radiosModel).map(function (obj) {
		if (obj.name === item.name) {
			obj.checked(true);
			self.selectedMethodType(obj.name);
		} else {
			obj.checked(false);
		}
		return obj;
	});
	self.radiosModel(radiosModel);
};

/**
 * Uniq id for radio btn
 * @param name
 * @returns {string}
 */
RadioFilter.prototype.getInputId = function (name) {
	return self.RADIO_ID + name;
};

/**
 * Sort function for methods aray
 * @param f
 * @param s
 * @returns {number}
 */
function compareMethods(f,s) {
	var a = f.name.toUpperCase();
	var b = s.name.toUpperCase();

	if (a === b) {return 0;}
	if (a === 'ALL' ||
		(a === 'GET' && (b === 'POST' || b === 'PUT' || b === 'DELETE')) ||
		(a === 'POST' && (b === 'PUT' || b === 'DELETE')) ||
		(a === 'PUT' && b === 'DELETE')) {
		return -1;
	}
	return 1;
}


ko.components.register('radio-filter', {
	viewModel: RadioFilter,
	template:`
		<!--radios-->
		<section data-bind="foreach: radiosModel" class="api-exp-methods__radio-buttons radio-buttons clearfix">
			<div data-bind="css: {active: checked}" class="api-exp-method">
				<input data-bind="attr: { id: $component.getInputId(name), checked: checked }, event: {change: $component.onchangeRadios}"
								class="api-exp-content-method__radio"
								type="radio"
								name="api-exp-methods">
				<label data-bind="text: name, attr: {for: $component.getInputId(name)}" class="radio-inline api-exp-method__label"></label>
			</div>
		</section>
`});

module.exports = RadioFilter;
