/*
	Before a URL change, test every input and textarea for a value
	
	Create an array within a key in storage. Use the array to constantly rotate 5 sets of objects,
	where the keys of the objects are the text-input identifiers from the webpage they were taken from.
	Every cycle, pop off the oldest one and unshift the newest.
	
	Browser icon credit: <div>Icons made by <a href="http://www.freepik.com" title="Freepik">Freepik</a> from <a href="http://www.flaticon.com" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
	
*/

window.onbeforeunload = function(){
  
  let x = document.querySelectorAll("input, textarea");
  let obj = {"url": window.location.href};
  
  console.log(x);

	for(let i=0; i<x.length; i++){
		if(x[i].value){
			console.log(x[i].value)
			console.log("Got it");
			let identifier = x[i].getAttribute("name") || x[i].getAttribute("id") || x[i].getAttribute("class") || i.toString();
			obj[identifier] = x[i].value;
		}
	}
	
	if(obj != {}){
	
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
        if (hasOwnProperty.call(obj, key)) return false;
    }
	return true;
}