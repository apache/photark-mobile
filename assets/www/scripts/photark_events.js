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

function initilizeClickEvents() {
	
	$("#tagPicture").click(function(e) {
	 	 e.preventDefault();
	 	 var x = e.pageX - this.offsetLeft;
	     var y = e.pageY - this.offsetTop;				     
	 	 showDialog(e,x,y) ;
    });
	
	$('#ContactsPage li a').live('click', function() {
		var name = $(this).text();
		onContactsClick(name);
	});

}

function initializePageShowFunctions() {
	//This method load existing metadata to edit metadata page on page load
	$('#EditMetadata').live('pageshow', function () {
		$("#nickName").val(getNickname());
		$("#editDate").val(getDate());
		$("#editTime").val(getTime());
		$("#editLocation").val(getLocation());
		$("#editDiscription").val(getDescription());
		// var people=getPeople();
		// var s="";
		// for (var i=0; i < people.length; i++) {
		  // s=s+people[i]+',';
		// };
		// $("#editPeople").val(s);
	});
	
	$('#photoTag').live('pageshow', function () {
		$('#tagPicture').html('<img id="tagImage"/>');
		displayTagImage(uri) ;
		markTags(tagObjectsSaved);
	});
}




