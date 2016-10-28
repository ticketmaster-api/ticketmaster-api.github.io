var self;

class CategoryMenu {
	constructor(params) {
		self = this;

		this.selectedCategory = params.selectedCategory;
		var initCategory = ko.unwrap(params.selectedCategory);
		this.categories = ko.observableArray(Object.keys(params.data).map(function (item, index) {
			var checked = initCategory ? item === initCategory: !index;
			// initial load
			checked && self.selectedCategory(item);
			return {
				checked: ko.observable(checked),
				name: item,
				link: false
			}
		}));

		params.selectedCategory.subscribe(categoryName => {
			checkActive(self.categories, categoryName);
		})
	}

	selectCategory(category) {
		var categoryName = category.name;
		self.selectedCategory(categoryName);
		checkActive(self.categories, categoryName);
	}
}

module.exports = ko.components.register('category-menu', {
	viewModel: CategoryMenu,
	template:`
		<aside class="api-exp-side-menu">
			<ul data-bind="foreach: categories" class="api-exp-side-menu__container nav nav-pills nav-stacked visible-lg-block">
				<li data-bind="css: {active: checked}" role="presentation" class="api-exp-side-menu__item">
					<a data-bind="click: $parent.selectCategory, text: name" href="#" class="api-exp-side-menu__link"></a>
				</li>
			</ul>
			<!--select-->
			<div class="api-exp-side-menu__select hidden-lg">
				<!-- ko template: { nodes: $componentTemplateNodes, data: $component } --><!-- /ko -->
			</div>
		</aside>
`});

function checkActive(koArr, activeElem) {
	if (!koArr && !activeElem) {return false;}

	koArr(koArr().map(function (obj) {
		if (obj.name === activeElem) {
			obj.checked(true);
		} else {
			obj.checked(false);
		}
		return obj;
	}));
}
