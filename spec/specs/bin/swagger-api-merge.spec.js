
describe("Swagger API Merge tool", () => {
	var resultJSON = require('./mocks/result.json');
	var controlJson = require('./mocks/control.json');

	it('should be merge Swagger API Json Files into one file', () => {
		expect(resultJSON).toEqual(controlJson);
	});
});
