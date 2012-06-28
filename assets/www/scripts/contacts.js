//////////////////////////////////////////////
function getContacts() {
	var optFilter = new ContactFindOptions();
	optFilter.filter = "";
	// to return all contacts
	optFilter.multiple = true;
	// return multiple results
	fields = [ "name" ];

	// get all contacts
	navigator.contacts.find(fields, gcsSuccess, gcsError, optFilter);
}

/* get all contacts error */
function gcsError(contactError) {
	alert('Contacts Error');
}

function gcsSuccess(contacts) {
	alert('loaded');
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
						.append('<li><a href="#EditMetadata"><img src="images/contactIcon.png" class="ui-li-icon" alt="Contact" onclick="onContactsClick()"/>'
								+ names[i] + '</a></li>');
			} else {
				if (i == 0)
					list.append('<li data-role="list-divider">' + divider
							+ '</li>');
				list
						.append('<li><a href="#EditMetadata"><img src="images/contactIcon.png" class="ui-li-icon" alt="Contact" onclick="onContactsClick()"/>'
								+ names[i] + '</a></li>');
			}
		}

		list.listview('refresh');
		// refresh the list view
	} else
		$('#allContacts').html('No contacts');
}

function onContactsClick(name){
	$('#editPeople').append(name+',');
}

// ////////////////////////////////////////////////////////////////
