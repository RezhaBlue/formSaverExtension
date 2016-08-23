/*
	Before a URL change, test every input and textarea for a value
*/

window.onbeforeunload = function(){
  
  let x = document.querySelectorAll("input, textarea");
  console.log(x);

  for(let i=0; i<x.length; i++){
    if(x[i].value){
		console.log(x[i].value)
		console.log("Got it");
    }
  }
}