var self;

function ErrorPopUp(params) {
	self = this;
	this.status = ko.observable('');
	this.statusText = ko.observable('');
	this.details = ko.observable(``);
	params.onError.subscribe(function(errorObj) {
		this.status(Object.getProp(errorObj, '.responseJSON.errors[0].status') || errorObj.status || 'unnown');
		this.statusText(Object.getProp(errorObj, '.responseJSON.errors[0].statusText') || errorObj.statusText || '');
		this.details(Object.getProp(errorObj, '.responseJSON.errors[0].detail') || 'unnown');
		this.togglePopUp();
	}, this, 'error');
}

ErrorPopUp.prototype.togglePopUp = function () {
	$('#error-modal').modal('show');
};

module.exports = ko.components.register('error-pop-up', {
	viewModel: ErrorPopUp,
	template:`
		<section id="error-modal" class="modal fade" tabindex="-1" role="dialog">
			<div class="modal-dialog" role="document">
				<div class="modal-content error-pop-up">
					<div class="modal-header">
						<h2 class="error-title">Error <span data-bind="text: status"></span>: <span data-bind="text: statusText"></span></h2>
					</div>
					<div class="modal-body">
						<p data-bind="text: details" class="error-details"></p>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-primary btn-accept" data-dismiss="modal" aria-label="Close">Ok</button>
					</div>
				</div><!-- /.modal-content -->
			</div><!-- /.modal-dialog -->
		</section><!-- /.modal -->
`});
