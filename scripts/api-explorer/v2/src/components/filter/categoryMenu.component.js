
class CategoryMenu {
	constructor({data, selectedCategory}) {
		this.selectedCategory = selectedCategory;
		var initCategory = ko.unwrap(this.selectedCategory);
		this.categories = ko.observableArray(Object.keys(data).map((item, index) => {
			var checked = initCategory ? item === initCategory: !index;
			// initial load
			checked && this.selectedCategory(item);
			return {
				checked: ko.observable(checked),
				name: item,
				link: false
			}
		}));

		this.selectedCategory.subscribe(categoryName => {
			checkActive(this.categories, categoryName);
		})
	}

	selectCategory = (category) => {
		var categoryName = category.name;
		this.selectedCategory(categoryName);
		checkActive(this.categories, categoryName);
	}
}

ko.components.register('category-menu', {
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

module.exports = CategoryMenu;
