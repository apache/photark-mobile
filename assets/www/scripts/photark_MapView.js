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

//Maps has to be initialized to the location of the current image when loaded
$('#mapView').live("pageshow", function() {
	if (getLocation() != "" && getLocation() != "undefined" && !(typeof(getLocation()) === 'undefined')) {
		//Has to convert to coordinates first
		var geocoder2 = new google.maps.Geocoder();
		geocoder2.geocode({'address': getLocation()}, function(results, status) {
		    if (status == google.maps.GeocoderStatus.OK) {		        
		        $('#map_canvas').gmap({'center': new google.maps.LatLng(results[0].geometry.location.lat(), results[0].geometry.location.lng()), 'zoom': 10, 'disableDefaultUI':false, 'callback': function() {
					var self = this;
					self.addMarker({'position': this.get('map').getCenter() }).click(function() {
						self.openInfoWindow({ 'content': getLocation() }, this);
					});	
				}});
		    } else {
		        alert(address + " cannot be found on Google Maps. Map view will be not available for this photo.");
		    }
		});
		
	}else {
		alert('Location not defined!');
		$.mobile.changePage("#main");
	}
	
});