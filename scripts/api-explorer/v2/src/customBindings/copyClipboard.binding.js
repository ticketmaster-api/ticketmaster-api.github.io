/**
 * copyToClipboard - A modern approach to copy text to clipboard
 *
 * example: <tag data-bind="copyToClipboard: {text: 'some text to copy'}"></tag>
 *
 * options:
 *	text: 'string' - copy|cut text
 *	-- optional --
 * 	target: <node|element> - target element
 * 	action: <string> - type of action 'copy' or 'cut'(cut only for text input field and textarea field)
 * 	doneClass: <string> - css class for successful action (default is done)
 * 	errorClass: <string> - css class for error action (default is error)
 * 	animationTime: <number> (default is 500)
 *
 * link to source: https://clipboardjs.com
 */
ko.bindingHandlers.copyToClipboard = {
	init: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
		let $element = $(element);
		let params = valueAccessor();
		let done = params.doneClass || 'done';
		let error = params.errorClass || 'error';
		let animationTime = params.animationTime || 500;

		element.clipboard = new Clipboard(element, {
			action(trigger) {
				return  params.action || 'copy';
			},
			target(trigger) {
				return params.target;
			},
			text(trigger) {
				return ko.unwrap(params.text);
			},
		});

		element.clipboard
			.on('success', e => {
				$element.addClass(done);
				setTimeout(() => $element.removeClass(done), animationTime);
				e.clearSelection();
			})
			.on('error', e => {
				$element.addClass(error);
				setTimeout(() => $element.removeClass(error), animationTime);
				console.error('copyToClipboard custom binding - Action:', e.action);
				console.error('copyToClipboard custom binding - Trigger:', e.trigger);
			});

		ko.utils.domNodeDisposal.addDisposeCallback(element, () => {
			if ($element.clipboard && typeof $element.clipboard.destroy === "function") {
				$element.clipboard && $element.clipboard.destroy();
				delete $element.clipboard;
			}
		});
	}
};
