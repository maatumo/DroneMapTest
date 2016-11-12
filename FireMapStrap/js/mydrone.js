
function getBody() {
  console.log("submit button pushed");
  var x = document.getElementById('bodyname').value;
  body=x;
  window.localStorage.setItem('myBodyName', x);
document.getElementById('answer').innerHTML = window.localStorage.getItem('mybodyname');
}
