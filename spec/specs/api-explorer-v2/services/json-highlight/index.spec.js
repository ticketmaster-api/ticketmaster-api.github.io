const $ = require('jquery');
window.$ = $;

jest.mock('scripts/api-explorer/v2/src/services/json-highlight/highlightJson.worker.js', () => {
	var worker = {
		postMessage: jest.fn()
	};
	var result = jest.fn(()=> worker);
	result.worker = worker;
	return result;
});

var highlightJsonMock = require('scripts/api-explorer/v2/src/services/json-highlight/highlightJson.worker.js');

var highlightJsonIndexModule = require('scripts/api-explorer/v2/src/services/json-highlight/index.js');



describe('API Explorer highlightJson index module', function () {
	var setFixture = () => {
		document.body.innerHTML =
			'<ul class="tm-code-container">' +
				'<li><span id="el-expanded" class="expanded"></span></li>' +
				'<li><span id="el-collapsed" class="expanded collapsed hidden"></span></li>' +

			'</ul>';
	};

	var observable = jest.fn();
	beforeAll(() => {
		highlightJsonIndexModule(observable, 'codeMock');
	});

	describe('When module init', () => {
		it('should call worker.postMessage with code', () => {
			expect(highlightJsonMock.worker.postMessage).toBeCalledWith('codeMock');
		});
		it('should define "onmessage" moethod', () => {
			expect(highlightJsonMock.worker.onmessage).toBeDefined();
		});

		it('should define "onerror" moethod', () => {
			expect(highlightJsonMock.worker.onerror).toBeDefined();
		});
	});

	describe('When worker receive error', () => {
		it('should post error to console', () => {
			spyOn(console, 'error');

			highlightJsonMock.worker.onerror('errorMock');
			expect(console.error).toBeCalledWith('errorMock');
		})
	});

	describe('When worker receive message', () => {
		it('should post data to observable', () => {
			highlightJsonMock.worker.onmessage({data: 'dataMock'});
			expect(observable).toBeCalledWith('dataMock');
		});
	});

	describe('when item clicked', () => {
		beforeEach(() => {
			setFixture();
			$.fn.slideUp =  (animTime, callback) => callback();
			$.fn.slideDown =  (animTime, callback) => callback();
		});

		it('should collapse expanded items on click event', () => {
			var expandedItem = $('#el-expanded');
			expect(expandedItem.hasClass('collapsed')).toBeFalsy();
			expandedItem.trigger('click');
			expect(expandedItem.hasClass('collapsed')).toBeTruthy();
		});

		it('should expand collapsed items', () => {
			var expandedItem = $('#el-collapsed');
			expect(expandedItem.hasClass('collapsed')).toBeTruthy();
			expect(expandedItem.hasClass('hidden')).toBeTruthy();
			expandedItem.trigger('click');
			expect(expandedItem.hasClass('collapsed')).toBeFalsy();
			expect(expandedItem.hasClass('hidden')).toBeFalsy();
		});
	});

	describe('when item touched', () => {
		beforeEach(() => {
			setFixture();
			$.fn.slideUp =  (animTime, callback) => callback();
			$.fn.slideDown =  (animTime, callback) => callback();
		});

		it('should collapse expanded items on click event', () => {
			var expandedItem = $('#el-expanded');
			expect(expandedItem.hasClass('collapsed')).toBeFalsy();
			expandedItem.trigger('touch');
			expect(expandedItem.hasClass('collapsed')).toBeTruthy();
		});

		it('should expand collapsed items', () => {
			var expandedItem = $('#el-collapsed');
			expect(expandedItem.hasClass('collapsed')).toBeTruthy();
			expect(expandedItem.hasClass('hidden')).toBeTruthy();
			expandedItem.trigger('touch');
			expect(expandedItem.hasClass('collapsed')).toBeFalsy();
			expect(expandedItem.hasClass('hidden')).toBeFalsy();
		});
	});
});
