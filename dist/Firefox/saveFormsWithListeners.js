let arr = [];

document.addEventListener("focus", function(e){
	let tag = e.explicitOriginalTarget;
	if((tag.tagName === 'INPUT' || tag.tagName === 'TEXTAREA' || tag.contentEditable === true) && !tag.getAttribute("acw_saved_4343") && tag.getAttribute("type")!== "password" && tag.getAttribute("type")!== "submit"){
		arr.push(tag);
		tag.setAttribute("acw_saved_4343", true);
	}
}, true)

window.onbeforeunload = function(){
  let obj = {"url": window.location.href};

	for(let i=0; i<arr.length; i++){
		if(arr[i].value){
			let identifier = arr[i].getAttribute("name") || arr[i].getAttribute("id") || arr[i].getAttribute("class") || i.toString();
			obj[identifier] = arr[i].value;
		}
	}
	
	if(!isEmpty(obj)){
	
	chrome.storage.local.get("savedInputs", (savedObj)=>{
		
		checkForErrors();
		
		if(isEmpty(savedObj)){
			chrome.storage.local.set({"savedInputs": [obj]}, checkForErrors);
		} else {
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
  }
}

function isEmpty(obj){
	for (var key in obj) {
        if (hasOwnProperty.call(obj, key) && key !== "url") return false;
    }
	return true;
}