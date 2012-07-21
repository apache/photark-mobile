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
	if( name!="" && startDate=="" && endDate=="" && location=="" && temp==""){
		searchDB('SELECT * FROM MAIN WHERE nickname LIKE "%'+name+'%";');		
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
				temp2='LIKE "%'+people[int]+'%" AND';
			} else{
				temp2='LIKE "%'+people[int]+'%";';
			}
			
		}
	}else if(temp=="" && name=="" && startDate=="" && endDate=="" && location!=""){
		searchDB('SELECT * FROM MAIN WHERE location LIKE "%'+location+'%";');
	}else if(temp=="" && name!="" && (startDate!="" || endDate!="") && location==""){
		if(startDate!="" && endDate==""){
			searchDB('SELECT * FROM MAIN WHERE date >= date("'+startDate+'") AND nickname LIKE "%'+name+'%";');
		}else if(startDate=="" && endDate!=""){
			searchDB('SELECT * FROM MAIN WHERE date <= date("'+endDate+'") AND nickname LIKE "%'+name+'%";');
		}else{
			searchDB('SELECT * FROM MAIN WHERE date >= date("'+startDate+'") and date <= date("'+endDate+'") AND nickname LIKE "%'+name+'%";');
		}	
	}else if(temp=="" && name=="" && (startDate!="" || endDate!="") && location!=""){
		if(startDate!="" && endDate==""){
			searchDB('SELECT * FROM MAIN WHERE date >= date("'+startDate+'") AND location LIKE "%'+location+'%";');
		}else if(startDate=="" && endDate!=""){
			searchDB('SELECT * FROM MAIN WHERE date <= date("'+endDate+'") AND location LIKE "%'+location+'%";');
		}else{
			searchDB('SELECT * FROM MAIN WHERE date >= date("'+startDate+'") and date <= date("'+endDate+'") AND location LIKE "%'+location+'%";');
		}	
	}else if(temp!="" && name=="" && (startDate!="" || endDate!="") && location==""){
		if(startDate!="" && endDate==""){
			searchDB('SELECT * FROM MAIN WHERE date >= date("'+startDate+'") AND nickname LIKE "%'+name+'%";');
		}else if(startDate=="" && endDate!=""){
			searchDB('SELECT * FROM MAIN WHERE date <= date("'+endDate+'") AND nickname LIKE "%'+name+'%";');
		}else{
			searchDB('SELECT * FROM MAIN WHERE date >= date("'+startDate+'") and date <= date("'+endDate+'") AND nickname LIKE "%'+name+'%";');
		}	
	}
	
}


function showResults(results) {
	$("#resultGallery").html("");
	$("#Gallery").html("");
	//var results=getResult();

		for ( var int = 0; int < results.length; int++) {
			alert(results[int]);
			if (i % 2 == 0) {
				$("#resultGallery").append('<div class="ui-block-a" ><div style="padding:5px !important;"><img src="'+results[int]+'"  style="height:150px !important; width:100% !important;" onclick=\'selectResult("'+results[int]+'")\' /></div></div>');
			} else {
				$("#resultGallery").append('<div class="ui-block-b" ><div style="padding:5px !important;"><img src="'+results[int]+'"  style="height:150px !important; width:100% !important;" onclick=\'selectResult("'+results[int]+'")\' /></div></div>');
			}
			$("#Gallery").append('<li><a href="'+results[int]+'" ><img src="'+results[int]+'"  alt="Photark" /></a></li>');
		}
	$.mobile.changePage($('#searchResults'));
}

function selectResult(uri){
	$("#metadata").html("");
	var largeImage = document.getElementById('largeImage');
	largeImage.style.display = 'block';
	largeImage.src = uri;
	//$('#myButton').removeClass('ui-disabled');
	$('#toolbar_icons').show();
	$('#toolbar_message').hide();
	$('#toolbar').listview("create");
	window.resolveLocalFileSystemURI(uri, onFileEntryComplete, isFail);
	viewData(uri);
	$('#largeImage').click(function() { fullScreen(largeImage.src); });
	$.mobile.changePage( $("#main") );

}


	