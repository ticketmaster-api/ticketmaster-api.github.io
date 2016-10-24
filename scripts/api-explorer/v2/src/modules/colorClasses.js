var NUM = 12;
var PREFIX = 'color-';

var colors = getColors(NUM, PREFIX);

function getColors(num, classPrefix) {
	var colors = new Array(num);

	for (var i = 0; i < colors.length; i++) {
		colors[i] = classPrefix + (i + 1);
	}
	return colors;
}

function getRandomColor(color) {
	var randomNumber;
	do {
		randomNumber = getRandomInt(1, colors.length);
	} while (PREFIX + randomNumber === color);

	return PREFIX + randomNumber;
}

/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
module.exports = {
	colors: colors,
	getRandomColor: getRandomColor
};
