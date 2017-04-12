var ko = require('knockout');
window.ko = ko;
require('scripts/api-explorer/v2/src/modules/validation.js');

describe("Validation module spec", function() {

	beforeEach(()=>{

	});

	describe('Validation rule "nullableInt"', ()=>{
		it('should be accept empty string', () => {
			var testObservable = ko.observable('');
			testObservable.extend({ nullableInt: true });
			expect(testObservable.isValid()).toBeTruthy();
		});

		it('should be accept null value', () => {
			var testObservable = ko.observable('');
			testObservable.extend({ nullableInt: true });
			expect(testObservable.isValid()).toBeTruthy();
		});

		it('should be accept any integer value', () => {
			var testObservable = ko.observable('1234567890');
			testObservable.extend({ nullableInt: true });
			expect(testObservable.isValid()).toBeTruthy();
		});

		it('should be not accept non integer values', () => {
			var testObservable = ko.observable('absd');
			testObservable.extend({ nullableInt: true });
			expect(testObservable.isValid()).toBeFalsy();
			expect(testObservable.error()).toBe('Must be empty or an integer value');
		});

		it('should be not accept decimal values with poin', () => {
			var testObservable = ko.observable('123.05');
			testObservable.extend({ nullableInt: true });
			expect(testObservable.isValid()).toBeFalsy();
			expect(testObservable.error()).toBe('Must be empty or an integer value');
		});
	});

	describe('Validation rule "nullableDecimal"', ()=>{
		it('should be accept empty string', () => {
			var testObservable = ko.observable('');
			testObservable.extend({ nullableDecimal: true });
			expect(testObservable.isValid()).toBeTruthy();
		});

		it('should be accept null value', () => {
			var testObservable = ko.observable('');
			testObservable.extend({ nullableDecimal: true });
			expect(testObservable.isValid()).toBeTruthy();
		});

		it('should be accept any integer value', () => {
			var testObservable = ko.observable('1234567890');
			testObservable.extend({ nullableDecimal: true });
			expect(testObservable.isValid()).toBeTruthy();
		});

		it('should be accept any decimal value with point', () => {
			var testObservable = ko.observable('1234.056789');
			testObservable.extend({ nullableDecimal: true });
			expect(testObservable.isValid()).toBeTruthy();
		});

		it('should be not accept non decimal values', () => {
			var testObservable = ko.observable('absd');
			testObservable.extend({ nullableDecimal: true });
			expect(testObservable.isValid()).toBeFalsy();
			expect(testObservable.error()).toBe('Must be empty or a decimal value');
		});

		it('should be not accept decimal values with more 1 point', () => {
			var testObservable = ko.observable('123.125.55');
			testObservable.extend({ nullableDecimal: true });
			expect(testObservable.isValid()).toBeFalsy();
			expect(testObservable.error()).toBe('Must be empty or a decimal value');
		});
	});

});
