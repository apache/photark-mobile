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

var tagEnabled=false;	//Whether add tag has clicked or not
var eValue;
var xValue;
var yValue;

//Called when user click on the photo to add a tag
function showDialog(e, x, y) {
	if(tagEnabled){		
		eValue=e;
		xValue=x;
		yValue=y;
		
		$.mobile.changePage("#NewTag");
	}else{
		alert("Tagging not enabled.");
	}
}

function TagObject(name, x, y) {
	this.name = name;
	this.x = x;		//x coordinate of clicked point
	this.y = y;		//y coordinate of clicked point
}

function saveTags() {
	for (i = 0; i < tagObjects.length; i++) {
		if(tagObjects.length==0){
			alert("No new tags has been added.");
		}
		addTag(tagObjects[i].name, tagObjects[i].x, tagObjects[i].y);
		tagObjectsSaved.push(tagObjects[i]);
	}
	tagObjects=new Array();	//buffer has to be cleared 
	alert("Tags Saved Successfully.");
	enableTagging();
}

//Marks associated tags when a new image is loaded
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

//Delete all tags associated with current photo from the database
function clearTags() {
	$('<div>').simpledialog2({
	    mode: 'button',
	    headerText: 'Delete Tags',
	    headerClose: true,
	    buttonPrompt: 'Are you sure you want to delete all the tags in this photo?',
	    buttons : {
	      'OK': {
	        click: function () { 
	        	deleteTags();
	        	$('#tagPicture').html('<img id="tagImage"/>');
	        	displayTagImage(getURI());
	        }
	      },
	      'Cancel': {
	        click: function () { 
	        	//Do nothing
	        },
	        icon: "delete",
	      }
	    }
	})
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

//toggle UI controls
function enableTagging() {
	if(!tagEnabled){
		tagEnabled=true;
		$('#saveTagsButton').show();
		$('#clearTagsButton').hide();
		$('#cancelTaggingButton').show();	
		$('#enableTaggingButton').hide();
	}else{
		tagEnabled=false;
		$('#saveTagsButton').hide();
		$('#clearTagsButton').show();
		$('#cancelTaggingButton').hide();		
		$('#enableTaggingButton').show();		
	}
}

function addTagClicked() {
	var name = $('#editPeople').val();
	showTag(name, xValue, yValue);
	var tgx = new TagObject(name, xValue, yValue);
	tagObjects.push(tgx);
	xValue=null;
	yValue=null;
	$.mobile.changePage("#photoTag");
}

//Disable tag editing mode
function cancelTagging() {
	tagObjects=new Array();
	enableTagging();
}
