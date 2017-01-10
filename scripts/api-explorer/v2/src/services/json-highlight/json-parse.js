var prefix = 'tm-code';

var getExpanderClasses = function (expanded) {
	if (!expanded) {
		return 'expanded collapsed hidden';
	}
	return 'expanded';
};

var encode = function (value) {
	return ['<span>', value, '</span>'].join('');
};

var createElement = function (key, value, type, expanderClasses) {
	var klass = 'object',
		open = '{',
		close = '}';

	if (Array.isArray(value)) {
		klass = 'array';
		open = '[';
		close = ']';
	}

	if (value === null) {
		return [
			'<li>',
				'<span class="key">"', encode(key), '": </span>',
				'<span class="null">"', encode(value), '"</span>',
			'</li>'
		].join('');
	}

	if (type == 'object') {
		return [
			'<li>',
				'<span class="', expanderClasses, '"></span>',
				'<span class="key">"', encode(key), '": </span> ',
				'<span class="open">', open, '</span> ',
				'<ul class="', klass, '">',
					json2html(value, expanderClasses),
				'</ul>',
				'<span class="close">', close, '</span>',
			'</li>'
		].join('');
	}

	if (type == 'number' || type == 'boolean') {
		return [
			'<li>',
				'<span class="key">"', encode(key), '": </span>',
				'<span class="', type, '">', encode(value), '</span>',
			'</li>'
		].join('');
	}
	return [
		'<li>',
			'<span class="key">"', encode(key), '": </span>',
			'<span class="', type, '">"', encode(value), '"</span>',
		'</li>'
	].join('');
};

var json2html = function (json, expanderClasses) {
	var html = '';
	for (var key in json) {
		if (!json.hasOwnProperty(key)) {
			continue;
		}

		html = [html, createElement(key, json[key], typeof json[key], expanderClasses)].join('');
	}
	return html;
};

var getJsonViewer = function (data, options) {
	try {
		return [
			'<ul class="', prefix, '-container">',
				json2html([JSON.parse(data)], getExpanderClasses(options.expanded)),
			'</ul>'
		].join('');
	} catch (e) {
		return [
			'<div class="', prefix, '-error" >', e.toString(), ' </div>'
		].join('');
	}
};

module.exports = function(data, opt) {
	var json = '';
	var options = opt || {expanded: true};
	if (typeof data == 'string') {
		json = data;
	} else if (typeof data == 'object') {
		json = JSON.stringify(data)
	}
	return getJsonViewer(json, options);
};
