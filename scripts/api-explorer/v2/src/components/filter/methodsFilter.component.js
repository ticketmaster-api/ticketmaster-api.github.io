var self;

class MethodsFilter {
	constructor({selectedCategory, data, selectedMethodType, selectedMethod}) {
		self = this;
		this.selectedCategory = selectedCategory;
		this.data = data;
		this.selectedMethodType = selectedMethodType;
		this.selectedMethod = selectedMethod;
		this.selectedMethodName = ko.observable('');
		this.methodsViewModel = ko.observableArray([]);
		this.init()
	}

	/**
	 * Initialization phase
	 */
	init = () => {
		this.updateMethodsModel(ko.unwrap(this.selectedMethodType));

		//on change
		this.selectedMethodType.subscribe(val => this.updateMethodsModel(val));
		this.selectedMethod.subscribe(val => {
			this.selectedMethodName(this.data[ko.unwrap(this.selectedCategory)]['ALL'][val].name)
		})
	}

	/**
	 * Filters transclusion dom nodes
	 * @param param {array} $componentTemplateNodes
	 * @param index {number} index of element
	 * @returns {array} dom nodes array for insertion
	 */
	filterTransclusion(param, index) {
		var text = param.find(function (item) {
			return item.nodeName === '#text';
		});
		var el = param.filter(function (item) {
			return item.nodeName !== '#text' && item.nodeName !== '#comment';
		})[index];
		return [text, el, text];
	};

	/**
	 * Updates VM for methods select
	 * @param methodType
	 */
	updateMethodsModel = (methodType) => {
		var obj = this.data[ko.unwrap(this.selectedCategory)][methodType]|| {},
			arr = [],
			selectedMethod = ko.unwrap(this.selectedMethod),
			count = 0;

		for (var i in obj) {
			if (!obj.hasOwnProperty(i)) { continue; }
			var property = obj[i];

			var vmMethod = $.extend({}, {
				id: property.id,
				name: property.name,
				link: property.link,
				checked: ko.observable( selectedMethod ? selectedMethod === property.id : !count )
			});

			if (selectedMethod === property.id) {
				this.selectedMethodName(property.name);
			}

			arr.push(vmMethod);

			// set global observable
			!selectedMethod && !count && this.selectedMethod(property.id);

			count++;
		}

		this.methodsViewModel(arr);
	};

	/**
	 * On select handler for methods select
	 * @param item
	 */
	onSelectMethod(item) {
		self.selectedMethod(item.id);
	};
}

module.exports = ko.components.register('methods-filter', {
	viewModel: MethodsFilter,
	template:`
		<section  class="api-exp-main-filter">
			<section class="api-exp-filter">
				<section class="api-exp-methods clearfix">
					<label class="api-exp-methods__label">Methods</label>
	
					<!--radios-->
					<!-- ko template: { nodes: filterTransclusion($componentTemplateNodes, 0), data: $component } --><!-- /ko -->
					
					<!--select-->
					<div class="api-exp-methods__select">
						<!-- ko template: { nodes: filterTransclusion($componentTemplateNodes, 1), data: $component }--><!--/ko-->
					</div>
				</section>
			</section>
		</section>
`});
