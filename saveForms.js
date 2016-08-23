/*
	Before a URL change, test every input and textarea for a value
	
	Create an array within a key in storage. Use the array to constantly rotate 5 sets of objects,
	where the keys of the objects are the text-input identifiers from the webpage they were taken from.
	Every cycle, pop off the oldest one and unshift the newest.
	
*/

window.onbeforeunload = function(){
  
  let x = document.querySelectorAll("input, textarea");
  let obj = {"url": window.location};
  
  console.log(x);

	for(let i=0; i<x.length; i++){
		if(x[i].value){
			console.log(x[i].value)
			console.log("Got it");
			let identifier = x[i].getAttribute("name") || x[i].getAttribute("id") || x[i].getAttribute("class") || i.toString();
			obj[identifier] = x[i].value;
		}
	}
	
	chrome.storage.local.get("savedInputs", (savedObj){
		
		checkForErrors();
		
		console.log(savedObj);
		savedObj.pop();
		savedObj.unshift(obj);
		chrome.storage.local.set({"savedInputs", savedObj}, checkForErrors);
	
	})

}

function checkForErrors() {
  if (chrome.runtime.lastError) {
    console.log(chrome.runtime.lastError);
  } else {
    console.log("OK");
  }
}