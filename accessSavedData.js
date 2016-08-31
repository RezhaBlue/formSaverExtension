'use strict';

chrome.storage.local.get((savedObj)=>{
	console.log("Calling from popup!");
	console.log(savedObj);
	
	if(Object.keys(savedObj).length){
		savedObj.savedInputs.forEach((curr, indx)=>{
			let x = document.createElement("div");
			x.setAttribute("class", "link");
			x.setAttribute("id", indx);
			let aElem = document.createElement("a");
			aElem.setAttribute("href", "#" + indx);
			aElem.innerText = curr.url;
			x.appendChild(aElem);
			let tableElem = document.createElement("table");
				tableElem.setAttribute("class", "table");
				tableElem.setAttribute("id", "table" + indx);
			let trElem = document.createElement("tr");
			let thOne = document.createElement("th");
			let thTwo = document.createElement("th");
				thOne.innerText = "Field";
				thTwo.innerText = "Text";
			trElem.appendChild(thOne);
			trElem.appendChild(thTwo);
			tableElem.appendChild(trElem);
			x.appendChild(tableElem);
	
			for(var key in curr){
				if(key!=="url"){
					let row = document.createElement("tr");
					let tdOne = document.createElement('td');
						tdOne.setAttribute("class", "keytd");
						tdOne.innerText = key;
					let tdTwo = document.createElement('td');
						tdTwo.setAttribute("class", "texttd");
						tdTwo.innerText = curr[key];
						row.appendChild(tdOne);
						row.appendChild(tdTwo);
					x.children[1].appendChild(row);
				}
			}
							
			document.getElementById("accordion").appendChild(x);
		})
	} else {
		console.log("Empty savedObj");
	}
});

document.getElementById("clearAll").addEventListener('click', ()=>{
	chrome.storage.local.clear(()=>{
		document.body.innerHTML = "";
		let hElem = document.createElement("h3");
			hElem.innerText = "Data Deleted!";
		document.body.appendChild(hElem);
	});
})