function parseGetParams() {
	var $_GET = {};
	var __GET = window.location.search.substring(1).split("&");
	for(var i=0; i<__GET.length; i++) {
		var getVar = __GET[i].split("=");
		$_GET[getVar[0]] = typeof(getVar[1])=="undefined" ? "" : getVar[1];
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

function getThreads(cursor) {
	var apiKey ='ohRvg9N3dieJJRshzJsaQbKJAO2ZNuAebul7MeXvICNIjNKjhuhPyTfSVzrP8y8M';
	var avatarUrl = '';
	var profileUrl = '';
	var userName = '';
	var content = '';
	var link = '';
	$.ajax({
		url: 'https://disqus.com/api/3.0/forums/listThreads.json?&api_key=' + apiKey + '&forum=ticketmasterapi&cursor=' + cursor,
		method: 'GET',
		dataType: 'json',
		async: false,
		success: function(data){
			for (i=0;i<data.response.length;i++) {
				if (data.response[i].posts > 0) {

					$.ajax({
						url: 'https://disqus.com/api/3.0/users/details.json?api_key=' + apiKey + '&user=' + data.response[i].author,
						method: 'GET',
						dataType: 'json',
						async: false,
						success: function (dataUser) {
							avatarUrl = dataUser.response.avatar.cache;
							profileUrl = dataUser.response.profileUrl;
							userName = dataUser.response.username;
						}
					});

					link = data.response[i].link.replace(':', '%3A');
					link = link.replace('/', '%2F');

					content += '<div class="row-forum">';
					content += '<div class="avatar"><a href="' + profileUrl + '" title="' + userName + '" title=""><img src="' + avatarUrl + '" alt="' + userName + '" title="' + userName + '" /></a></div>';
					content += '<div class="title"><a href="/support/forum/?category=' + data.response[i].identifiers[0] + '&link=' + data.response[i].link + '">' + data.response[i].identifiers[0] + '</a></div>';
					content += '<div class="created">' + formatDate(data.response[i].createdAt) + '</div>';
					content += '<div class="updated">' + formatDate(data.response[i].createdAt) + '</div>';
					content += '<div class="posts">' + data.response[i].posts + '</div>';
					content += '<div class="likes">' + data.response[i].dislikes + '</div>';
					content += '</div>';
				}
			}
			if (data.cursor.hasNext==true) {
				getThreads(data.cursor.next);
			}
			$('#disqus-table').append(content);
		}
	});

}

function getPosts(newIdentifier, newUrl) {
	$('.thread .search').remove();
	$('.thread .tabs-forum').remove();
	$('.thread .row-forum.header').remove();
  $('#disqus_header').html(decodeURI(newIdentifier));
};

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

$( document ).ready(function() {

	if (!parseGetParams().hasOwnProperty('category')) {
		$('#disqus_header').remove();
		$('#disqus_thread').remove();
		getThreads('');
	}
	else {
		getPosts(parseGetParams().category, parseGetParams().link);
	}

});
