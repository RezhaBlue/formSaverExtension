/*
	Before a URL change, test every input and textarea for a value
	
	Create an array within a key in storage. Use the array to constantly rotate 5 sets of objects,
	where the keys of the objects are the text-input identifiers from the webpage they were taken from.
	Every cycle, pop off the oldest one and unshift the newest.
	
	Browser icon credit: <div>Icons made by <a href="http://www.freepik.com" title="Freepik">Freepik</a> from <a href="http://www.flaticon.com" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
	
*/

//Content script is loaded when DOM is finished as specified by manifest.json.

let arr = [];

document.addEventListener("focus", function(e){
	let tag = e.explicitOriginalTarget;
	if((tag.tagName === 'INPUT' || tag.tagName === 'TEXTAREA' || tag.contentEditable === true) && !tag.getAttribute("acw_saved_4343")){
		arr.push(tag);
		tag.setAttribute("acw_saved_4343", true);
	}
}, true)

x = document.getElementsByTagName("iframe");

for(let i=0; i<x.length; i++){
 
	let iframe = x[i].contentWindow;
	console.log("Iframe:");
	console.log(iframe);
	
  iframe.document.addEventListener("focus", function(e){
    console.log("Inside the iframe listener");
	let tag = e.explicitOriginalTarget;
	if((tag.tagName === 'INPUT' || tag.tagName === 'TEXTAREA' || tag.contentEditable === true) && !tag.getAttribute("acw_saved_4343")){
		let identifier = tag.getAttribute("name") || tag.getAttribute("id") || tag.getAttribute("class") || arr.length.toString();
		console.log("Id: " + identifier);
    tag.setAttribute("acw_saved_4343", true);
    arr.push(tag);
    console.log(tag);
  
  }}, true)
}


window.onbeforeunload = function(){
 
  let obj = {"url": window.location.href};

	for(let i=0; i<arr.length; i++){
		if(arr[i].value){
			let identifier = arr[i].getAttribute("name") || arr[i].getAttribute("id") || arr[i].getAttribute("class") || i.toString();
			console.log(arr[i].value)
			obj[identifier] = arr[i].value;
		}
	}
	
	if(!isEmpty(obj)){
	
	chrome.storage.local.get("savedInputs", (savedObj)=>{
		
		checkForErrors();
		
		if(isEmpty(savedObj)){
			console.log("savedObj does not exist. Obj.")
			console.log(obj);
			
			chrome.storage.local.set({"savedInputs": [obj]}, checkForErrors);
		} else {
			
			console.log("SavedObj exists. First obj, then saved obj");
			console.log(obj)
			console.log(savedObj);			
			console.log(savedObj.savedInputs);
			
			if(savedObj.savedInputs.length>=5){
				savedObj.savedInputs.shift();
			}
			savedObj.savedInputs.push(obj);
			
			chrome.storage.local.set({"savedInputs": savedObj.savedInputs}, checkForErrors);

		}
	})
	} else {
		console.log("No text inputs saved on this page.");
		console.log(obj);
	}
}

function checkForErrors() {
  if (chrome.runtime.lastError) {
    console.log(chrome.runtime.lastError);
  } else {
    console.log("OK");
  }
}

function isEmpty(obj){
	for (var key in obj) {
        if (hasOwnProperty.call(obj, key) && key !== "url") return false;
    }
	return true;
}