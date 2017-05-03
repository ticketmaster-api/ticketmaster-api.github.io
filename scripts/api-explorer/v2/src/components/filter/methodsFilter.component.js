var self;

class MethodsFilter {
	constructor({selectedCategory, data, selectedMethodType, selectedMethod}) {
		self = this;
		this.selectedCategory = selectedCategory;
		this.data = data;
		this.selectedMethodType = selectedMethodType;
		this.selectedMethod = selectedMethod;
		this.selectedMethodName = ko.observable();
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
			this.selectedMethodName(ko.unwrap(this.methodsViewModel).find(item => item.id === val));
		})
	};

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
			correctOrder = this.data[ko.unwrap(this.selectedCategory)]['__correctOrder'],
			arr = [],
			selectedMethod = ko.unwrap(this.selectedMethod);

		for (var i in obj) {
			if (!obj.hasOwnProperty(i)) { continue; }
			var property = obj[i];

			var vmMethod = $.extend({}, {
				id: property.id,
				name: property.name,
				link: property.link,
				checked: ko.observable(false)
			});

			if (selectedMethod === property.id) {
				this.selectedMethodName(vmMethod);
			}

			arr.push(vmMethod);
		}

		if (correctOrder) {
			let allMethodsOrder = correctOrder.concat(Object.keys(obj)); // needed for move non-exist items to end of list
			arr = arr.sort((methodA, methodB) => {
				return allMethodsOrder.indexOf(methodA.id) - allMethodsOrder.indexOf(methodB.id);
			});
		}

		if(arr.length){
			arr[0].checked = ko.observable(true); // select first item
			!selectedMethod && this.selectedMethod(arr[0].id);
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

ko.components.register('methods-filter', {
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

module.exports = MethodsFilter;
