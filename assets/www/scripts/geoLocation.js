/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements. See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership. The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

//<script type="text/javascript" src="http://maps.google.com/maps/api/js?sensor=false"></script>
var pos;

function onGeoSuccess(position) {
	pos=position;
    alert( 'Location success: '+pos.coords.latitude+","+ pos.coords.longitude);
	updateLocation();

}

function onGeoError(error) {
    alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
}


function getGeoLocation(){
	try{
	navigator.geolocation.getCurrentPosition(onGeoSuccess,onGeoError,{ enableHighAccuracy: false });
	}
	catch(error){
		alert('fail');
	}
}

function addLocation(){
	$.mobile.showPageLoadingMsg();
	getGeoLocation();
}


function updateLocation(){
	var latlng = new google.maps.LatLng(pos.coords.latitude,pos.coords.longitude);
	//var latlng = new google.maps.LatLng(6.9167,79.8333);
	var geocoder = new google.maps.Geocoder();
	geocoder.geocode({'latLng': latlng}, function(results, status) {
	  if (status == google.maps.GeocoderStatus.OK) {
		  var address= (results[0].formatted_address);
		  loc = address;
		  updateDB();
		  alert("Location updated:"+address);
	  } else {
	    alert("Geocoder failed due to: " + status);
	  }
	});
	$.mobile.hidePageLoadingMsg();
	$.mobile.changePage("#main");
}

function adressToCoordinate(address) {
	var loc;
	var geocoder = new google.maps.Geocoder();
	geocoder.geocode({'address': address}, function(results, status) {
	    if (status == google.maps.GeocoderStatus.OK) {
	        lat=results[0].geometry.location.lat();
	        long=results[0].geometry.location.lng();
	        
	        alert(lat+","+long);
	    } else {
	        alert(address + " cannot be found on Google Maps. Map view will be not available for this photo.");
	    }
	});
}


