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

function doSearch(){
	var name=$("#searchName").val();
	var startDate=$("#searchStartDate").val();
	var endDate=$("#searchEndDate").val();
	var location=$("#searchLocation").val();
	var temp=$("#searchPeople").val();
	var people=new Array();
	
	if(temp!=undefined && temp!=""){
		people=temp.split(",");
	}
	if(name=="" && startDate=="" && endDate=="" && location=="" && temp==""){
		alert("Fill the information!");
		return;
	}
	if(startDate=="" && endDate=="" && temp==""){
		searchDB('SELECT * FROM MAIN WHERE nickname LIKE "%'+name+'%" AND location LIKE "%'+location+'%";');		
	}else if(name=="" && (startDate!="" || endDate!="") && location=="" && temp==""){
		if(startDate!="" && endDate==""){
			searchDB('SELECT * FROM MAIN WHERE date >= date("'+startDate+'");');
		}else if(startDate=="" && endDate!=""){
			searchDB('SELECT * FROM MAIN WHERE date <= date("'+endDate+'");');
		}else{
			searchDB('SELECT * FROM MAIN WHERE date >= date("'+startDate+'") and date <= date("'+endDate+'");');
		}		
	}else if(temp!=undefined && temp!="" && name=="" && startDate=="" && endDate=="" && location==""){
		var temp2='SELECT * FROM PEOPLE WHERE ';
		for ( var int = 0; int < people.length; int++) {
			if (int != people.length-1) {
				temp2+='name LIKE "%'+people[int]+'%" AND ';
			} else{
				temp2+='name LIKE "%'+people[int]+'%"; ';
			}
		}
		searchDB(temp2);
	}else if(temp=="" && (startDate!="" || endDate!="") && (name!="" || location!="")){
		if(startDate!="" && endDate==""){
			searchDB('SELECT * FROM MAIN WHERE date >= date("'+startDate+'") AND nickname LIKE "%'+name+'%" AND location LIKE "%'+location+'%";');
		}else if(startDate=="" && endDate!=""){
			searchDB('SELECT * FROM MAIN WHERE date <= date("'+endDate+'") AND nickname LIKE "%'+name+'%" AND location LIKE "%'+location+'%";');
		}else{
			searchDB('SELECT * FROM MAIN WHERE date >= date("'+startDate+'") and date <= date("'+endDate+'") AND nickname LIKE "%'+name+'%" AND location LIKE "%'+location+'%";');
		}	
	}else if(temp!="" && (startDate!="" || endDate!="")){
		var temp3='SELECT * FROM MAIN NATURAL JOIN PEOPLE WHERE nickname LIKE "%'+name+'%" AND location LIKE "%'+location+'%" AND';
		for ( var int = 0; int < people.length; int++) {
				temp3+='name LIKE "%'+people[int]+'%" AND ';
		}
		if(startDate!="" && endDate==""){
			temp3+=' date >= date("'+startDate+'");';
		}else if(startDate=="" && endDate!=""){
			temp3+=' date <= date("'+endDate+'");';
		}else{
			temp3+=' date >= date("'+startDate+'") and date <= date("'+endDate+'");';
		}	
		searchDB(temp3);
	}else if(temp!="" && startDate=="" && endDate==""){
		var temp4='SELECT * FROM MAIN NATURAL JOIN PEOPLE WHERE nickname LIKE "%'+name+'%" AND location LIKE "%'+location+'%" AND';
		for ( var int = 0; int < people.length; int++) {
			if (int != people.length-1) {
				temp4+='name LIKE "%'+people[int]+'%" AND ';
			} else{
				temp4+='name LIKE "%'+people[int]+'%"; ';
			}
		}
		searchDB(temp4);
	}
}


function showResults(results) {
	$("#resultGallery").html("");
	$("#Gallery").html("");

		for ( var int = 0; int < results.length; int++) {
			if(results.length==0){
				alert("Sorry, no results found");
			}
			if (i % 2 == 0) {
				$("#resultGallery").append('<div class="ui-block-a" ><div style="padding:5px !important;"><img src="'+results[int]+'"  style="height:150px !important; width:100% !important;" onclick=\'selectResult("'+results[int]+'")\' /></div></div>');
			} else {
				$("#resultGallery").append('<div class="ui-block-b" ><div style="padding:5px !important;"><img src="'+results[int]+'"  style="height:150px !important; width:100% !important;" onclick=\'selectResult("'+results[int]+'")\' /></div></div>');
			}
			$("#Gallery").append('<li><a href="'+results[int]+'" ><img src="'+results[int]+'"  alt="Photark" /></a></li>');
		}
		if(results.length==0){
			alert("Sorry, no results found");
		}else{
			$.mobile.changePage($('#searchResults'));
		}
}

function selectResult(uri){
	$("#metadata").html("");
	var largeImage = document.getElementById('largeImage');
	largeImage.style.display = 'block';
	largeImage.src = uri;
	onImageUpdated();
	$('#toolbar').listview("create");
	window.resolveLocalFileSystemURI(uri, onFileEntryComplete, isFail);
	viewData(uri);
	$('#largeImage').click(function() { fullScreen(largeImage.src); });
	
	displayTagImage(uri) ;
	
	tagObjects=new Array();
	
    $('#largeImage').css({
          // Using jQuery CSS we write the $width variable we previously specified as a pixel value. We use max-width incase the image is smaller than our viewport it won't scale it larger. Don't forget to set height to auto or else it will squish your photos.
          'max-width' : windowWidth , 'height' : 'auto'
    });   
    
    tagObjectsSaved=new Array();
	$('#largeImage').click(function() { fullScreen(largeImage.src); });

	$.mobile.changePage( $("#main") );
}

function viewAllImages(){
	searchDB('SELECT * FROM MAIN WHERE nickname LIKE "%";');
}


	