var self;

function AboutMethod(params) {
	self = this;
	var method = ko.unwrap(params.selectedMethodData);
	this.documentationLink = ko.observable(method.link);
	this.name = ko.observable(method.name);
	this.description = ko.observable(method.description);

	// on model change
	params.selectedMethodData.subscribe(function (val) {
		this.documentationLink(val.link);
		this.name(val.name);
		this.description(val.description);
	}, this);

	// methods
	this.togglePopUp  = ko.observable(false);
}

AboutMethod.prototype.onAboutClick = function (model) {
	return model.togglePopUp(!model.togglePopUp());
};

ko.components.register('about-method', {
	viewModel: AboutMethod,
	template:`
		<section data-bind="css: {active: togglePopUp}" class="api-exp-about">
			<div class="api-exp-about-wrapper">
				<button data-bind="click: onAboutClick" class="api-exp-about__button devices-button"></button>
				<a data-bind="attr: {href: documentationLink}" href="#" class="api-exp-about__button" target="_blank"></a>
				<article class="api-exp-about__content">
					<h5 data-bind="text: name" class="api-exp-about__title">About API and Method:</h5>
					<section class="api-exp-about__description">
						<p data-bind="text: description"></p>
						<p>
							<a data-bind="attr: {href: documentationLink}" target="_blank" href="#" class="api-exp-about__description-link">Read mode</a>
						</p>
					</section>
				</article>
				<div data-bind="click: onAboutClick" class="api-exp-about-layer"></div>
			</div>
		</section>
`});
module.exports = AboutMethod;
