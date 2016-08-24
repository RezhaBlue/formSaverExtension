'use strict';

chrome.storage.local.get((savedObj)=>{
	console.log("Calling from popup!");
	console.log(savedObj);
	
	savedObj.savedInputs.forEach((curr)=>{
		let x = document.createElement("div");
		x.innerHTML = "<div>" + JSON.stringify(curr) + "</div>";
		document.body.appendChild(x);
	})
})