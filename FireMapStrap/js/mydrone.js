
window.onload = function() {
  if(localStorage){
    var local=localStorage;
    console.log('localStrage is available!');
    if(localStorage.getItem('myBodyName')){
      console.log('Find Name!');
        document.getElementById('answer').innerHTML = "Your drone is on Map! : "+localStorage.getItem('myBodyName')+"<input type='button' value='End Mapping' style='float: right' onClick='logOut()'>";
      }
  }
};


function getBody() {
  console.log("submit button pushed");
  var x = document.getElementById('bodyname').value;
  body=x;
  localStorage.setItem('myBodyName', x);
  document.getElementById('answer').innerHTML = "Your drone is on Map! : "+localStorage.getItem('myBodyName')+"<input type='button' value='End Mapping' style='float: right' onClick='logOut()'>";
}

function logOut(){
  localStorage.clear();
  document.getElementById('answer').innerHTML = localStorage.getItem('myBodyName');
}
