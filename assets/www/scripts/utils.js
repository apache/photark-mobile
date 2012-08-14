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
	window.resolveLocalFileSystemURI(filepath, deleteEntry, function() {
		alert('error: unable to resovle local fs uri')
	});
	reset();
}

function deleteEntry(entry) {
	entry.remove(function(entry) {
		alert('Removal succeeded');
	}, function(error) {
		alert('Error removing file: ' + error.code);
	});
}

function reset() {
	$('#toolbar_icons').hide();
	$('#toolbar_message').show();
	$('#largeImage').attr("src", "images/logo.png");
}

function fullScreen(uri) {
	$("#Gallery").html(
			'<li><a href="' + uri + '" ><img src="' + uri
					+ '"  alt="Photark" /></a></li>');
	var myPhotoSwipe = Code.PhotoSwipe.attach(window.document
			.querySelectorAll('#Gallery a'), {
		enableMouseWheel : false,
		enableKeyboard : false
	});
	myPhotoSwipe.show(0);
}

function fulllScreen() {
	var myPhotoSwipe = Code.PhotoSwipe.attach(window.document
			.querySelectorAll('#Gallery a'), {
		enableMouseWheel : false,
		enableKeyboard : false
	});
	myPhotoSwipe.show();
}

function scaleImageWidth(maxWidth, width, height, image) {
	if (width > maxWidth) {
		var ratio = maxWidth / width; // get ratio for scaling image
		image.width = maxWidth;
		image.height = height * ratio; // Scale height based on ratio

	}
}

function adjustScreenLayout() {
	windowWidth = $(window).width();
	windowHeight = $(window).height();
	// document.getElementById('largeImage').width = windowWidth;
	// // 3:4 is the most common aspect ratio
	// document.getElementById('largeImage').height = windowWidth * (3 / 4);

	$('#largeImage').css({
		// Using jQuery CSS we write the $width variable we previously specified
		// as a pixel value. We use max-width incase the image is smaller than
		// our viewport it won't scale it larger. Don't forget to set height to
		// auto or else it will squish your photos.
		'max-width' : windowWidth,
		'height' : 'auto'
	});

	$('#map_canvas').css('width', windowWidth * (7 / 8));
	$('#map_canvas').css('height', windowHeight * (5 / 6));
	$('#map_canvas').css('margin-left', 'auto');
	$('#map_canvas').css('margin-right', 'auto');
}

function showDialog(e, x, y) {
	$('<div>').simpledialog2({
		mode : 'button',
		headerText : 'Tag',
		headerClose : true,
		buttonPrompt : 'Type Name',
		buttonInput : true,
		buttons : {
			'OK' : {
				click : function() {
					var name = $.mobile.sdLastInput;
					showTag(name, x, y);
					var tgx=new TagObject(name,x,y);
					tagObjects.push(tg1);
				}
			},
		}
	})
}

function TagObject(name, x, y) {
	this.name = name;
	this.x = x;
	this.y = y;
}

function saveTags() {
	for (i = 0; i < tagObjects.length; i++) {
		addTag(tagObjects[i].name, tagObjects[i].x, tagObjects[i].y);
	}
	alert(tagObjects[0].x);
}

function markTags(tagObjectsSaved) {

	for (i = 0; i < tagObjectsSaved.length; i++) {
		showTag(tagObjectsSaved[i].name, parseInt(tagObjectsSaved[i].x),
				parseInt(tagObjectsSaved[i].y));
	}
}

function showTag(name, x, y) {
	var img = $('<p>' + name + '</p>');
	img.css('top', y);
	img.css('left', x);
	img.css('color', 'purple');
	img.appendTo('#tagPicture');
}

function clearTags() {
	deleteTags();
	$('#tagPicture').html('<img id="tagImage"/>');
	displayTagImage(getURI());
}

function displayTagImage(uri) {
	var tagImage = document.getElementById('tagImage');
	tagImage.style.display = 'block';
	tagImage.src = uri;

	$('#tagImage').css({
		// Using jQuery CSS we write the $width variable we previously specified
		// as a pixel value. We use max-width incase the image is smaller than
		// our viewport it won't scale it larger. Don't forget to set height to
		// auto or else it will squish your photos.
		'max-width' : (windowWidth - 30),
		'height' : 'auto'
	});

}

function loadjscssfile(scriptUrl) {
	var head = document.getElementsByTagName("head")[0];
	script = document.createElement('script');
	script.type = 'text/javascript';
	script.src = scriptUrl;
	head.appendChild(script);
}

function validate(variable) {
	if (variable == "") {
		return 'undifined';
	} else {
		return variable;
	}
}

function getCurrentDate() {
	var currentTime = new Date()
	var month = currentTime.getMonth() + 1
	var day = currentTime.getDate()
	var year = currentTime.getFullYear()
	return (month + "/" + day + "/" + year);
}

function getCurrentTime() {
	var time = "";
	var currentTime = new Date();
	var hours = currentTime.getHours();
	var minutes = currentTime.getMinutes();
	if (minutes < 10) {
		minutes = "0" + minutes;
	}
	var h;
	if (hours > 11) {
		h = hours - 12;
	} else {
		if (hours < 10) {
			h = '0' + hours;
		} else {
			h = hours;
		}
	}
	time += (h + ":" + minutes + " ");
	if (hours > 11) {
		time += ("PM");
	} else {
		time += ("AM");
	}
	return time;
}

function checkNetwork() {
	var networkState = navigator.network.connection.type;
	if (networkState == Connection.NONE) {
		alert("Cannot connect to internet. Some functionalities may not available");
	}	
}

function onHomeButtonClicked(){
	$("#largeImage").attr("src","images/home.png");
	
	$('#imageInfoButton').hide();
	$('#photoTagButton').hide();
	$('#deleteButton').hide();
	$('#homeButton').hide();
	
	$('#captureButton').show();
	$('#galleryButton').show();
	$('#webAlbumButton').show();
	$('#helpButton').show();
}
