if(localStorage){
	var local=localStorage;
	console.log('localStrage is available!');
	var str="";
	for(var i in localStorage) {
	    console.log(i);
	    str=str+i;
	}
    document.getElementById('localdata').innerHTML = str;

}
