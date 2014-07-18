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
			populatePage();
		});
	});

	/**
	 * Function to get HTML for each of the projects to be inserted into the page
	 * @param  {String}  name        Name of the Project
	 * @param  {String}  url         URL linking to the GitHub project
	 * @param  {String}  description Description of the project
	 * @param  {String}  language    Language that the project is in
	 * @param  {boolean} isfork		 true if yes, false if not
	 * @return {String}             HTML to be inserted into the page
	 */
	function getProjectHTML(name, url, description, language, isfork) {
		if (language === null) {
			language = '';
		}
		var forkhtml = '';
		if (isfork) {
			forkhtml = '<span class="glyphicon glyphicon-cutlery"></span> ';
		}
		var html = '<div class="col-md-4"><div class="container project"><h1 class="projecttitle"><a href="' + url + '">' + forkhtml + name + '</a></h1><p class="projectdescription">' + description + '</p><p class="projectlanguage">' + language + '</p></div></div>'
		return html;
	}

	/**
	 * Function to set initial page data after loading config.json file
	 */
	function setPageData() {
		$('#forkmebanner').attr('href', 'http://github.com/' + CONFIG_DATA.username);
		$('#title').text(CONFIG_DATA.firstname + ' ' + CONFIG_DATA.lastname + '\'s GitHub Portfolio');
		$('#about').attr('href', CONFIG_DATA.about);
		$('#website').attr('href', CONFIG_DATA.website);
		$('#fullprofile').attr('href', 'http://github.com/' + CONFIG_DATA.username);
		$('#pagetitle').text(CONFIG_DATA.firstname + '\'s GitHub Showcase');
		var forkexplainhtml = '<h3 align="center" style="magin-bottom:-6em;margin-top:4em;color:white;font-family:\'Shadows Into Light\', sans-serif;"><span class="glyphicon glyphicon-cutlery"></span> = forked repository</h3>';
		if (CONFIG_DATA.showforks) {
			$('#forkedexplanation').append(forkexplainhtml);
		}
	}

	/**
	 * Function to start populating the page with the projects
	 * Also handles fading in the new content
	 */
	function populatePage () {
		for (var repo in REPO_DATA) {
			var currentRepo = REPO_DATA[repo];
			var name = currentRepo.name;
			var url = currentRepo.html_url;
			var description = currentRepo.description;
			var language = currentRepo.language;
			var isfork = currentRepo.fork;
			if (!isfork || CONFIG_DATA.showforks) {
				$('#projects').append(getProjectHTML(name, url, description, language, isfork));
			}
		}
		// Fade spinner out, and fade everything else in after it has all been added
		$('#spinner').fadeOut(750, function () {
			$('#content').fadeIn(500);
		});
	}
});