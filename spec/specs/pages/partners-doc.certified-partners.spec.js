var module, $ = require('jquery');

window.$ = window.jQuery = $;
module = require('scripts/pages/partners-doc.certified-partners.js');

describe("tabs hander", () => {
	let urlAddition = "#test",
		setFixture = () => {
			document.body.innerHTML =
				`
			<div id="scrollable-element">
				<ul class="sections menu-highlight">
					<li>
						<a href="/partners/certified-partners/#north-american-partners" aria-controls="north-american-partners" id="one">North American Partners</a>
					</li>
					<li>
						<a href="/partners/certified-partners/#test" aria-controls="test" id="two">Test</a>
					</li>														
				</ul>
			</div>
				<div class="common_tabs">				
					<ul class="nav nav-tabs nav-tabs-centered" role="tablist">				
							<li role="presentation" class="hidden-xs ">
								<a class="tab" href="#test" aria-controls="test" role="tab" data-toggle="tab">Test</a>
							</li>					
							<li role="presentation" class="hidden-xs ">
								<a class="tab" href="#test2" aria-controls="test2" role="tab" data-toggle="tab">Test2</a>
							</li>				
					</ul>				
				</div>
				<div class="tiles-wrapper tab-content ">
					<div role="tabpanel" class="tab-pane" id="test">					
						<div class="card">
							<div class="content">
								I always feel like somebody's watching me
							</div>
						</div>					
				</div>
					<div role="tabpanel" class="tab-pane" id="test2">
						<div class="card">
							<div class="content">
								I always feel like somebody's watching me
							</div>
						</div>
					</div>
				</div>
				`
		};
	beforeAll(() => {
		Object.defineProperty(window.location, 'hash', {
			writable: true
		});
		Object.defineProperty(window.location, 'href', {
			writable: true
		});
		setFixture();
		$.fn.tab = jest.fn();
	});
	beforeEach(()=>{
		$(document).trigger('ready');
	});

	it('redirect-user-role-user-role should be Defined', () => {
		expect(module).toBeDefined();
	});

	it('should check hash if/else brunch', () => {
		window.location.href = 'www.ticketmaster.foo/' + urlAddition;
		expect(window.location.hash).toBeUndefined();
		setFixture();
		$('document').trigger('ready');
		window.location.hash = 'test2';
		expect(window.location.hash).toEqual('test2');
	});

	it('should update hash', () => {
		window.location.href = '';
		let e = new $.Event('shown');
		e.target = { hash: 'test' };
		$('.nav-tabs a').trigger(e);
		expect(window.location.hash).toEqual(e.target.hash);
	});

	it('should set tab', () => {
		$('document').trigger('ready');
		let e = new $.Event('click');
		e.preventDefault = jest.fn();
		let el = $('a#two');
		 el.trigger('click');
		expect($.fn.tab).toBeCalled();
	});

	it('should trigger ready', () => {
		let card1 = $('.card').first();
		expect(card1.hasClass('applyflip')).toBeFalsy();
		card1.trigger('mouseenter');
		expect(card1.hasClass('applyflip')).toBeTruthy();
	});
	
});
