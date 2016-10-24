var colors = [
	'column-color-1',
	'column-color-2',
	'column-color-3',
	'column-color-4',
	'column-color-5',
	'column-color-6',
	'column-color-7',
	'column-color-8',
	'column-color-9',
	'column-color-10',
	'column-color-11',
	'column-color-12'
];

function getRandomColor(color) {
	var randomNumber;
	do {
		randomNumber = getRandomInt(1, colors.length);
	} while ('column-color-' + randomNumber === color);

	return 'column-color-' + randomNumber;
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
