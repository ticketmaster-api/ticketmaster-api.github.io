var fs = require('fs');

describe('API Explorer json-parse module', function () {
	beforeAll(() => {
		this.module = require('scripts/api-explorer/v2/src/services/json-highlight/json-parse.js');
	});

	it('should transform JSON to HTML with expanded sub properties', () => {
		var htmlFromJSON = this.module(require('./mocks/input.json'));
		var controlHtmlContent = fs.readFileSync( __dirname +'/mocks/expanded.html', 'utf8');
		expect(htmlFromJSON).toBe(controlHtmlContent);

		//fs.writeFileSync(__dirname + '/mocks/expanded.html', this.module(require('./mocks/input.json')), 'utf8');
	});

	it('should transform JSON to HTML with collapsed sub properties', () => {
		var htmlFromJSON = this.module(require('./mocks/input.json'), {expanded: false} );
		var controlHtmlContent = fs.readFileSync( __dirname +'/mocks/collapsed.html', 'utf8');
		expect(htmlFromJSON).toBe(controlHtmlContent);

		//fs.writeFileSync(__dirname + '/mocks/collapsed.html', this.module(require('./mocks/input.json'), {expanded: false}), 'utf8');
	});
});
