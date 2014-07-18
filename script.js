$(document).ready(function () {
	// constants
	var CONFIG_DATA = {};
	var REPO_DATA = {};
	var GITHUB_API_BASE_URL = 'https://api.github.com/users/'; // trailing backslash required

	$('#content').hide();

	$.get('config.json', function (data) {
		CONFIG_DATA = data;
		setPageData();
		$.get(GITHUB_API_BASE_URL + CONFIG_DATA.username + '/repos', function (repodata) {
			REPO_DATA = repodata;
			console.log(REPO_DATA);
			startPopulating();
		});
	});

	function setPageData() {
		$('#forkmebanner').attr('href', 'http://github.com/' + CONFIG_DATA.username);
		$('#title').text(CONFIG_DATA.firstname + ' ' + CONFIG_DATA.lastname + '\'s GitHub Portfolio');
		$('#about').attr('href', CONFIG_DATA.about);
		$('#website').attr('href', CONFIG_DATA.website);
		$('#fullprofile').attr('href', 'http://github.com/' + CONFIG_DATA.username);
	}

	function startPopulating () {
		// do this last, after everything else has been added
		$('#spinner').fadeOut(750, function () {
			$('#content').fadeIn(500);
		});
	}
});