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


var fileURI;


function deleteFile(filepath) {
	window.resolveLocalFileSystemURI(filepath, deleteEntry,
			function() { alert('error: unable to resovle local fs uri') } );
	reset();
}

function deleteEntry(entry) {
	entry.remove(function (entry) {
	alert('Removal succeeded');
	}, function (error) {
	alert('Error removing file: ' + error.code);
	});
}

function reset() {
	$('#toolbar_icons').hide();
	$('#toolbar_message').show();
	$('#largeImage').attr("src","images/logo.png");
}

function fullScreen(uri){
	$("#Gallery").html('<li><a href="'+uri+'" ><img src="'+uri+'"  alt="Photark" /></a></li>');
	var myPhotoSwipe = Code.PhotoSwipe.attach( window.document.querySelectorAll('#Gallery a'), { enableMouseWheel: false , enableKeyboard: false } );
	myPhotoSwipe.show(0);
}

function fulllScreen() {
	var myPhotoSwipe = Code.PhotoSwipe.attach( window.document.querySelectorAll('#Gallery a'), { enableMouseWheel: false , enableKeyboard: false } );
	myPhotoSwipe.show(0);
}

function scaleImageWidth(maxWidth,width,height,image){
	 if(width > maxWidth){
         var ratio = maxWidth / width;   // get ratio for scaling image
         image.width=maxWidth;
         image.height= height * ratio;  // Scale height based on ratio
       
     }
}

function adjustScreenLayout() {
	windowWidth=$(window).width();
	windowHeight=$(window).height();
	document.getElementById('largeImage').width=windowWidth;
	//3:4 is the most common aspect ratio
	document.getElementById('largeImage').height=windowWidth*(3/4);
	
	$('#map_canvas').css('width',windowWidth*(7/8));
	$('#map_canvas').css('height',windowHeight*(5/6));
	$('#map_canvas').css('margin-left','auto');
	$('#map_canvas').css('margin-right','auto');
}





