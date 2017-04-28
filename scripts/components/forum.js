var arThreads = [];
var arThreadsFind = [];

function parseGetParams() {
	var $_GET = {};
	var __GET = window.location.search.substring(1).split('&');
	for(var i=0; i<__GET.length; i++) {
		var getVar = __GET[i].split('=');
		$_GET[getVar[0]] = typeof(getVar[1])=="undefined" ? '' : getVar[1];
	}
	return $_GET;
}

function formatDate(date) {
	var monthNames = [
		"Jan", "Feb", "Mar",
		"Apr", "May", "Jun", "Jul",
		"Aug", "Sep", "Oct",
		"Nov", "Dec"
	];

	date = date.substring(0,10);

	var pattern = /(\d{2})\-(\d{2})\-(\d{4})/;
	var dt = new Date(date.replace(pattern,'$3-$2-$1'));

	var day = dt.getDate();
	var monthIndex = dt.getMonth();
	var year = dt.getFullYear();

	return monthNames[monthIndex] + ' ' + day + ', ' + year;
}

function dynamicSort(property) {
	var sortOrder = 1;
	if(property[0] === "-") {
		sortOrder = -1;
		property = property.substr(1);
	}
	return function (a,b) {
		var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
		return result * sortOrder;
	}
}

function getThreads(cursor='') {
	var apiKey ='ohRvg9N3dieJJRshzJsaQbKJAO2ZNuAebul7MeXvICNIjNKjhuhPyTfSVzrP8y8M';
	$.ajax({
		url: 'https://degratnik-prod.apigee.net/disqus-tkm/3.0/forums/listThreads.json?&api_key=' + apiKey + '&forum=ticketmasterapi&cursor=' + cursor + '&limit=100',
		method: 'GET',
		dataType: 'json',
		success: processedThreads
	});
}

function processedThreads(data) {
	for (var i=0; i<data.response.length; i++) {
		if (data.response[i].posts > 0) {
			arThreads.push(data.response[i]);
		}
	}
	if (data.cursor.hasNext == true) {
		getThreads(data.cursor.next);
	}
}

function drawThreads(threads, start, limit) {
	var content = '';
	var countPages = Math.ceil(parseFloat(threads.length / limit));
	var startPage = parseInt(start);
	start = parseInt(start*limit);
	limit = (parseInt(start+limit) >  parseInt(threads.length)) ? parseInt(threads.length) : parseInt(start+limit);
	for (var i = start; i < limit; i++) {
		content += '<div class="row-forum">';
		content += '<div class="title"><a href="/support/forum/?category=' + decodeURI(threads[i].clean_title) + '&link=' + threads[i].link + '">' + decodeURI(threads[i].clean_title) + '</a></div>';
		content += '<div class="created">' + formatDate(threads[i].createdAt) + '</div>';
		content += '<div class="posts">' + threads[i].posts + '</div>';
		content += '<div class="likes">' + threads[i].likes + '</div>';
		content += '</div>';
	}
	content += '<div class="pager">';
	for( i = 0; i < countPages; i++) {
		if (i != startPage) content += '<a href="/support/forum/?page=' + (i+1) + '" rel="' + i + '">' + (i+1) + '</a>';
		else content += '<span>' + (i+1) + '</span>';
	}
	content += '</div>';
	$('#disqus-table').html(content);
}

function sortThreads(e, cArray, field) {
	var cls = 'asc';
	e.preventDefault();
	if ( $(e.target).hasClass('asc') ) {
		cls = 'desc' ;
		field = "-" + field;
	}
	else {
		cls = 'asc';
	}
	$(e.target).parent().children().removeClass('asc desc');
	$(e.target).addClass(cls);
	cArray.sort(dynamicSort(field));
	drawThreads(cArray, 0, 8);
}

function findThreads(arr) {
	arThreadsFind = [];
	var limit = 8;
  var toFind = $('#search-inp').val().toUpperCase();
	for (var i in arr) {
		if (arr[i].clean_title.toUpperCase().indexOf(toFind) >= 0) {
			arThreadsFind.push(arr[i]);
		}
	}
	if (arThreadsFind.length < 8) limit = arThreadsFind.length;
	if (arThreadsFind.length <= 0) {
		$('.row-forum.header').addClass('hide');
		$('.no-results').removeClass('hide');
	} else {
		$('.row-forum.header').removeClass('hide');
		$('.no-results').addClass('hide');
	}
	drawThreads(arThreadsFind, 0, limit);
}

function getPosts(newIdentifier) {
	$('.thread .search').remove();
	$('.thread .tabs-forum').remove();
	$('.thread .row-forum.header').remove();
	$('#disqus-table').remove();
  $('#disqus_header').html(decodeURI(newIdentifier));
};

function initForum() {

	if (!parseGetParams().hasOwnProperty('category')) {
		$('.thread .backtoall').remove();
		$('#disqus_header').remove();
		$('#disqus_thread').remove();
		getThreads();
		$(document).ajaxStop(function() {
			drawThreads(arThreads, 0, 8);
		});
	}
	else {
		getPosts(parseGetParams().category);
	}

	$('body').on('click', '#disqus-table .pager a', function(e) {
		e.preventDefault();
		drawThreads( (arThreadsFind.length > 0) ? arThreadsFind : arThreads, parseInt($(this).attr('rel')), 8);
	});

	$('body').on('click', '.row-forum.header .title', function(e) {
		sortThreads(e, (arThreadsFind.length > 0) ? arThreadsFind : arThreads, 'clean_title');
	});

	$('body').on('click', '.row-forum.header .created', function(e) {
		sortThreads(e, (arThreadsFind.length > 0) ? arThreadsFind : arThreads, 'createdAt');
	});

	$('body').on('click', '.row-forum.header .posts', function(e) {
		sortThreads(e, (arThreadsFind.length > 0) ? arThreadsFind : arThreads, 'posts');
	});

	$('body').on('click', '.row-forum.header .likes', function(e) {
		sortThreads(e, (arThreadsFind.length > 0) ? arThreadsFind : arThreads, 'likes');
	});

	$('body').on('click', '#search-btn', function(e) {
		if ($('#search-inp').val().length > 0) {
			$('#search-inp').addClass('act');
			$('.row-forum.header').children().removeClass('asc desc');
			findThreads(arThreads);
		}
		else {
			$('#search-inp').removeClass('act');
			$('.row-forum.header').children().removeClass('asc desc');
			arThreadsFind = [];
			drawThreads(arThreads, 0, 8);
		}
	});

	$('body').on('click', '.sclose', function(e) {
		$('#search-inp').val('');
		$('#search-inp').removeClass('act');
		$('.no-results').addClass('hide');
		$('.row-forum.header').removeClass('hide');
		$('.row-forum.header').children().removeClass('asc desc');
		arThreadsFind = [];
		sortThreads(e, arThreads, '-createdAt');
		drawThreads(arThreads, 0, 8);
	});
}

var disqus_config = function () {
	this.page.url = parseGetParams().link;
	this.page.identifier = parseGetParams().category;
};

(function() { // DON'T EDIT BELOW THIS LINE
	var d = document, s = d.createElement('script');

	s.src = '//ticketmasterapi.disqus.com/embed.js';

	s.setAttribute('data-timestamp', + new Date());
	(d.head || d.body).appendChild(s);
})();

$(document).ready(function() {
	initForum();
});

// CommonJS exports
if (typeof module !== "undefined") {
	module.exports = {
		arThreads: arThreads,
		parseGetParams: parseGetParams,
		formatDate: formatDate,
		dynamicSort: dynamicSort,
		getThreads: getThreads,
		processedThreads: processedThreads,
		drawThreads: drawThreads,
		sortThreads: sortThreads,
		findThreads: findThreads,
		getPosts: getPosts,
		initForum: initForum
	};
}
