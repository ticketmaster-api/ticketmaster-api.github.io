describe('API Explorer colors service', function () {

	const controlColorsList =  [
		'color-1',
		'color-2',
		'color-3',
		'color-4',
		'color-5',
		'color-6',
		'color-7',
		'color-8',
		'color-9',
		'color-10',
		'color-11',
		'color-12'
	];

	beforeAll(() => {
		this.module = require('scripts/api-explorer/v2/src/services/colors.service.js');
	});

	it('should return all colors list', () => {
		expect(this.module.getColors()).toEqual(controlColorsList);
	});

	it('should return any random color', () => {
		expect(controlColorsList).toContain(this.module.getRandomColor());
	});

	it('should return any random color but not match with input color', () => {
		var inputColor = 'color-6';
		expect(this.module.getRandomColor(inputColor)).not.toBe(inputColor);
	});

});
