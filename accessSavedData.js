'use strict';

chrome.storage.local.get((savedObj)=>{
	console.log("Calling from popup!");
	console.log(savedObj);
	
	savedObj.savedInputs.forEach((curr, indx)=>{
		let x = document.createElement("div");
		x.innerHTML = 	`<div id="${indx}" data-toggle="collapse" href="#table${indx}">
						  ${curr.url}
							<table id="table${indx}">
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
				x.children[0].children[0].appendChild(row);
			}
		}
						
		document.body.appendChild(x);
	})
})