'use strict';

chrome.storage.local.get((savedObj){
	document.body.innerHTML = "<div>" + JSON.stringify(savedObj) + "</div>";
})