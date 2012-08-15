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

var tagEnabled=false;

function showDialog(e, x, y) {
	if(tagEnabled){
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
							var tgx = new TagObject(name, x, y);
							tagObjects.push(tgx);
					}
				},
			}
		})
	}else{
		alert("Tagging not enabled.");
	}
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
	alert("Tags Saved Successfully.");
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

function enableTagging() {
	if(!tagEnabled){
		tagEnabled=true;
		$('#saveTagsButton').show();
		$('#clearTagsButton').show();
		$('#cancelTaggingButton').show();
		
		$('#enableTaggingButton').hide();
	}else{
		tagEnabled=false;
		$('#saveTagsButton').hide();
		$('#clearTagsButton').hide();
		$('#cancelTaggingButton').hide();
		
		$('#enableTaggingButton').show();
		
	}
}
