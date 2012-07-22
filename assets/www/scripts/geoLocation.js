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
    alert( 'Location success' );

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
	$.mobile.showPageLoadingMsg("b", "Location Updating", false);
	getGeoLocation();
//	updateLocation();
	$.mobile.changePage("#main");
	$.mobile.hidePageLoadingMsg();
	
}