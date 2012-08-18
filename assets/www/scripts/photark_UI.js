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


function initializeDataPickers() {
	//Handler for date picker
	$('#editDate').scroller({
		preset : 'date',
		theme : 'default',
		display : 'modal',
		mode : 'scroller',
		dateOrder : 'yymmdd',
		dateFormat : "yy-mm-dd"
	});
	
	$('#searchStartDate').scroller({
		preset : 'date',
		theme : 'default',
		display : 'modal',
		mode : 'scroller',
		dateOrder : 'yymmdd',
		dateFormat : "yy-mm-dd"
	});
	
	$('#searchEndDate').scroller({
		preset : 'date',
		theme : 'default',
		display : 'modal',
		mode : 'scroller',
		dateOrder : 'yymmdd',
		dateFormat : "yy-mm-dd"
	});
	
}

function initializeTimePickers(){
	//Handler for time picker
	$('#editTime').scroller({
		preset : 'time',
		theme : 'default',
		display : 'modal',
		mode : 'scroller'
	});
}

function editDateOnClick(parent) {
	parent.scroller('show');
}

function editTimeOnClick(parent) {
	$('#editTime').scroller('show');
}

function onMenuClick(){
	$.mobile.changePage("#optionMenu");
}

function clearMetadata(){
    $("#nickName").val("Not defined");
	$("#editDate").val("");
	$("#editTime").val("");
	$("#editLocation").val("");
	$("#editDiscription").val("");
}

//These are used as error handlers

function onFail(message) {
	alert('Failed because: ' + message);
}

function isFail() {
	alert("Error Occured");
}

//////////////////////////////////

//THis has to be called when a new image is loaded to workspace
function resetView(){
	$("#metadata").html("");
	$('#toolbar').listview("create");
	$('#largeImage').css({
         // Using jQuery CSS we write the $width variable we previously specified as a pixel value. We use max-width incase the image is smaller than our viewport it won't scale it larger. Don't forget to set height to auto or else it will squish your photos.
         'max-width' : windowWidth , 'height' : 'auto'
    });   
}


function successMetadata(metadata) {
	$("#metadata").append("<p> LastModified:" + metadata.modificationTime + "</p> ");
}

function successFile(file) {
	$("#metadata").append("<p> Size:" + file.size + "bytes </p> <p> Type:" + file.type + " </p>");
}