/**
 * blockEllipsis - Clamps (ie. cuts off) an HTML element's content by adding ellipsis to it if the content inside is too long.
 *
 * example: <tag data-bind="blockEllipsis: {clamp: 2}"></tag>
 * link to source: https://github.com/josephschmitt/Clamp.js
 */
ko.bindingHandlers.blockEllipsis = {
	init: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
		$clamp(element, valueAccessor());
	}
};
