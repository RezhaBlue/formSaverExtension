'use strict';

chrome.storage.local.get((savedObj)=>{
	
	if(Object.keys(savedObj).length){
		savedObj.savedInputs.forEach((curr, indx)=>{
			let x = document.createElement("div"),
				aElem = document.createElement("a"),
				tableElem = document.createElement("table"),
				trElem = document.createElement("tr"),
				thOne = document.createElement("th"),
				thTwo = document.createElement("th");
			x.setAttribute("class", "link");
			x.setAttribute("id", indx);

			aElem.setAttribute("href", "#" + indx);
			aElem.innerText = curr.url;
			x.appendChild(aElem);

				tableElem.setAttribute("class", "table");
				tableElem.setAttribute("id", "table" + indx);

				thOne.innerText = "Field";
				thTwo.innerText = "Text";
			trElem.appendChild(thOne);
			trElem.appendChild(thTwo);
			tableElem.appendChild(trElem);
			x.appendChild(tableElem);
	
			for(var key in curr){
				if(key!=="url"){
					let row = document.createElement("tr"),
						tdOne = document.createElement('td'),
						tdTwo = document.createElement('td')
						tdOne.setAttribute("class", "keytd");
						tdOne.innerText = key;
						tdTwo.setAttribute("class", "texttd");
						tdTwo.innerText = curr[key];
						row.appendChild(tdOne);
						row.appendChild(tdTwo);
					x.children[1].appendChild(row);
				}
			}
							
			document.getElementById("accordion").appendChild(x);
		})
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