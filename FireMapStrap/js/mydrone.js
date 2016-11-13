if(localStorage){
	var local=localStorage;
	console.log('localStrage is available!');
	document.getElementById('answer').innerHTML = localStorage.getItem('myBodyName');
	if(localStorage.getItem('myBodyName')){
		console.log('Find Name!');
	}
}

function getBody() {
  console.log("submit button pushed");
  var x = document.getElementById('bodyname').value;
  body=x;
  localStorage.setItem('myBodyName', x);
  document.getElementById('answer').innerHTML = localStorage.getItem('myBodyName');
}

function logOut(){
  localStorage.clear();
  document.getElementById('answer').innerHTML = localStorage.getItem('myBodyName');
}