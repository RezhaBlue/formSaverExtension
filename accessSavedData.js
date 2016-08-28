'use strict';

chrome.storage.local.get((savedObj)=>{
	console.log("Calling from popup!");
	console.log(savedObj);
	
	if(Object.keys(savedObj).length){
		savedObj.savedInputs.forEach((curr, indx)=>{
			let x = document.createElement("div");
			x.innerHTML = 	`<div class="link" id="${indx}">
							  <a href="#${indx}">${curr.url}</a>
								<table class="table" id="table${indx}">
									<tr>
										<th>Field</th>
										<th>Text</th>
									</tr>
								</table>
							</div>`;
							
			for(var key in curr){
				if(key!=="url"){
					let row = document.createElement("tr");
					row.innerHTML = `<td>${key}</td>
									<td>${curr[key]}</td>`
					x.children[0].children[1].appendChild(row);
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