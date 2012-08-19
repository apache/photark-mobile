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
var contactsLoaded=false;

function getContacts() {
	if(!contactsLoaded){
		contactsLoaded=true;
		var optFilter = new ContactFindOptions();
		optFilter.filter = "";
		// to return all contacts
		optFilter.multiple = true;
		// return multiple results
		fields = [ "name" ];

		// get all contacts
		navigator.contacts.find(fields, gcsSuccess, gcsError, optFilter);
	}
	
}

/* get all contacts error */
function gcsError(contactError) {
	alert('Contacts Error');
}

function gcsSuccess(contacts) {
	if (contacts.length != 0) {
		// get formatted names and sort
		var names = new Array();
		for ( var i = 0; i < contacts.length; ++i) {
			if (contacts[i].name) {
				if (contacts[i].name.formatted)
					names.push(contacts[i].name.formatted);
			}
		}
		names.sort();

		var list = $('#allContacts');
		// list to put contacts
		list.html('');
		// remove all the list items
		var divider = names[0][0];
		// first divider letter
		for ( var i = 0; i < names.length; ++i) {
			if (divider != names[i][0]) {// add a new divider
				divider = names[i][0];
				list
						.append('<li data-role="list-divider">' + divider
								+ '</li>');
				list
						.append('<li><a href="#"><img src="images/contactIcon.png" class="ui-li-icon" alt="Contact" onclick=\'onContactsClick("'+names[i]+'")\'/>'
								+ names[i] + '</a></li>');
			} else {
				if (i == 0)
					list.append('<li data-role="list-divider">' + divider
							+ '</li>');
				list
						.append('<li><a href="#"><img src="images/contactIcon.png" class="ui-li-icon" alt="Contact" onclick=\'onContactsClick("'+names[i]+'")\'/>'
								+ names[i] + '</a></li>');
			}
		}

		list.listview('refresh');
		// refresh the list view
	} else
		$('#allContacts').html('No contacts');
}

function onContactsClick(name){
	$('#editPeople').val(name);
	$.mobile.changePage( $("#NewTag") );
}


