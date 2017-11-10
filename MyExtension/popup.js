$(document).ready(function() {
	$("#justabutton").on("click", function() {
		chrome.tabs.create({"url": "https://www.youtube.com"});
	})
});