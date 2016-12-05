/**
 * Colors service (singleton)
 */

var num = Symbol('NUM');
var prefix = Symbol('PREFIX');
let instance = null;

class ColorsService {
	constructor(NUM = 12, PREFIX = 'color-') {
		if (!instance) {
			instance = this;
		}

		this[num] = NUM;
		this[prefix] = PREFIX;
		this.colors = this.getColors();

		return instance;
	}

	/**
	 * Gets random color css class
	 * @param color {string} existing css class to prevent mach
	 * @returns {string} css class name
	 */
	getRandomColor(color) {
		let randomNumber;
		let PREFIX = this[prefix];
		do {
			randomNumber = this.constructor.getRandomInt(1, this.colors.length);
		} while (PREFIX + randomNumber === color);

		return PREFIX + randomNumber;
	}

	/**
	 * Builds array of colors css classes
	 * @returns {Array} array of strings
	 */
	getColors() {
		let colors = new Array(this[num]);
		for (var i = 0; i < colors.length; i++) {
			colors[i] = this[prefix] + (i + 1);
		}
		return colors;
	}

	/**
	 * Returns a random integer between min (inclusive) and max (inclusive)
	 * Using Math.round() will give you a non-uniform distribution!
	 */
	static getRandomInt(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
}

module.exports = new ColorsService();
