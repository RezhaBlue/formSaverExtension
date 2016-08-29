'use strict';

chrome.storage.local.get((savedObj)=>{
	console.log("Calling from popup!");
	console.log(savedObj);
	
	if(Object.keys(savedObj).length){
		savedObj.savedInputs.forEach((curr, indx)=>{
			let x = document.createElement("div");
			x.setAttribute("class", "link");
			x.setAttribute("id", indx);
			x.innerHTML = 	`<a href="#${indx}">${curr.url}</a>
								<table class="table" id="table${indx}">
									<tr>
										<th>Field</th>
										<th>Text</th>
									</tr>
								</table>`;
							
			for(var key in curr){
				if(key!=="url"){
					let row = document.createElement("tr");
					row.innerHTML = `<td class="keytd">${key}</td>
									<td class="texttd" id="sub${key}"></td>`;
					row.children[1].innerText = curr[key];
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
		document.body.innerHTML = "<h3>Data deleted!</h3>";
	});
})