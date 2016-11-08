


var mymarker;
var myPos={lat:32.4,lng:130.2};
//icons
var marker = [];
var infoWindow = [];
var markerData = [];
// Maps
	var map;
	var tokyo;
	var pos;

	function initMap() {
		map = new google.maps.Map(document.getElementById('map'), {
			center: {lat: 32.4, lng: 130.2},
			zoom: 12
			}
		);
		tokyo = new google.maps.LatLng(35.689614,139.691585);
		pos = new google.maps.LatLng(34.686272,135.519649);

		for (var i = 0; i < markerData.length; i++) {
        markerLatLng = new google.maps.LatLng({lat: markerData[i]['lat'], lng: markerData[i]['lng']}); // 緯度経度のデータ作成
        marker[i] = new google.maps.Marker({ // マーカーの追加
            position: markerLatLng, // マーカーを立てる位置を指定
            map: map // マーカーを立てる地図を指定
        });
 
        infoWindow[i] = new google.maps.InfoWindow({ // 吹き出しの追加
            content: '<div class="sample">' + markerData[i]['name'] + '</div>' // 吹き出しに表示する内容
        });
 
        markerEvent(i); // マーカーにクリックイベントを追加
	    }	 


		//自分の位置のマーカー
		
		if(mymarker){		mymarker.setMap(null);}
		mymarkerLatLng = new google.maps.LatLng({lat: myPos["lat"], lng: myPos["lng"]}); // 緯度経度のデータ作成
		mymarker = new google.maps.Marker({ // マーカーの追加
		position: mymarkerLatLng, // マーカーを立てる位置を指定
		map: map, // マーカーを立てる地図を指定
		draggable:true,
		icon: 'self_pos.png',
		});

		// マーカーのドロップ（ドラッグ終了）時のイベント
		google.maps.event.addListener( mymarker, 'dragend', function(ev){
			// イベントの引数evの、プロパティ.latLngが緯度経度。
			myPos["lat"] = ev.latLng.lat();
			myPos["lng"] = ev.latLng.lng();
			
			setPos(myPos["lat"],myPos["lng"]);
			var date = new Date();
			dataStore.child('airplanes').child(body).update({
		  	lat: myPos["lat"],
		  	lng: myPos["lng"],
		  	bodyType: 'multicopter',
		  	updateTime: date.getFullYear()  + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
			});
		});



	    
	}


	// マーカーにクリックイベントを追加
	function markerEvent(i) {
    	marker[i].addListener('click', function() { // マーカーをクリックしたとき
        infoWindow[i].open(map, marker[i]); // 吹き出しの表示
    	});
    }
	function OnButtonClick() {
	target = document.getElementById("output");
	target.innerHTML = "penguin";
	}

	function setTokyo() {
	  map.setCenter(tokyo);
	}

	function setPos(lat,lng) {
		pos = new google.maps.LatLng(lat,lng);
	    map.setCenter(pos);
	}



//Firebase Legacy
var dataStore;
dataStore = new Firebase('https://amakusa.firebaseio.com/');
var body='DJI Phantom';
var airplanes=dataStore.child('airplanes');

//Get Key
var gkey;
dataStore.child('key').on('child_added',function(dataSnapShot){
	gkey = dataSnapShot.val();
	console.log("gkey"+gkey);
	var src= "https://maps.googleapis.com/maps/api/js?key="+gkey+"&callback=initMap";
	var scriptElement = document.createElement('script');
	scriptElement.src = src ;
	document.getElementsByTagName('head')[0].appendChild(scriptElement);
});

// airplanes.on('child_changed',function(dataSnapShot){
// 	var data = dataSnapShot.val();
// });

//firebaseの情報が変更されたら発火
airplanes.on('value',function(dataSnapShot){
	var data = dataSnapShot.val();
	console.log('data from firebase!');
	console.log(data);
	markerData = [];
	for(var bodyname in data){
		console.log(bodyname+" data "+data[bodyname]);
		markerData.push({
	        name: bodyname,
	        lat: data[bodyname]["lat"],
	        lng: data[bodyname]["lng"],
	        updateTime: data[bodyname]["updateTime"]
	    });
	}
	for (var i = 0; i < marker.length; i++) {
		marker[i].setMap(null);
	}
	marker=[];
	for (var i = 0; i < markerData.length; i++) {
		markerLatLng = new google.maps.LatLng({lat: markerData[i]['lat'], lng: markerData[i]['lng']}); // 緯度経度のデータ作成
		marker[i] = new google.maps.Marker({ // マーカーの追加
		position: markerLatLng, // マーカーを立てる位置を指定
		map: map, // マーカーを立てる地図を指定

		});
		infoWindow[i] = new google.maps.InfoWindow({ // 吹き出しの追加
		content: '<div class="sample">' + markerData[i]['name'] + '</div>' // 吹き出しに表示する内容
		});
		markerEvent(i); // マーカーにクリックイベントを追加
	}

});


//定期的に位置情報を発信する。http://qiita.com/yutori_enginner/items/98ecaae8945e3c17efa2
	var StartTimer, StopTimer, Timer, time, timerID;
	time = 0;
	timerID = 0;
	StartTimer = function() {
		time = 0;
		timerID = setInterval(Timer/*定期的に呼び出す関数名*/, 1000/*呼び出す間隔*/);
	};
	StopTimer = function() {
	  clearInterval(timerID);
	};
	Timer = function() {
	  time = time + 1;
	  console.log(time);
	  if (time > 3) {
	    StopTimer();
	    // 情報の更新
	    setPos(myPos["lat"],myPos["lng"]);
		var date = new Date();
		dataStore.child('airplanes').child(body).update({
		  lat: myPos["lat"],
		  lng: myPos["lng"],
		  bodyType: 'multicopter',
		  updateTime: date.getFullYear()  + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
		});

		//自分の位置のマーカー
		
		if(mymarker){		mymarker.setMap(null);}
		mymarkerLatLng = new google.maps.LatLng({lat: myPos["lat"], lng: myPos["lng"]}); // 緯度経度のデータ作成
		mymarker = new google.maps.Marker({ // マーカーの追加
		position: mymarkerLatLng, // マーカーを立てる位置を指定
		map: map, // マーカーを立てる地図を指定
		draggable:true,
		icon: 'self_pos.png',
		});

		// マーカーのドロップ（ドラッグ終了）時のイベント
		google.maps.event.addListener( mymarker, 'dragend', function(ev){
			// イベントの引数evの、プロパティ.latLngが緯度経度。
			myPos["lat"] = ev.latLng.lat();
			myPos["lng"] = ev.latLng.lng();

			setPos(myPos["lat"],myPos["lng"]);
			var date = new Date();
			dataStore.child('airplanes').child(body).update({
		  	lat: myPos["lat"],
		  	lng: myPos["lng"],
		  	bodyType: 'multicopter',
		  	updateTime: date.getFullYear()  + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
			});
		});


    	StartTimer();
	    // return alert("情報が更新されました");
	  }
	};
//	StartTimer();//タイマースタート
