var fileURI;


function deleteFile() {
	window.resolveLocalFileSystemURI(fileURI, deleteEntry,
			function() { alert('error: unable to resovle local fs uri') } );
	reset();
}




function deleteEntry(entry) {
	entry.remove(function (entry) {
	alert(fileURI+'removal succeeded');
	}, function (error) {
	alert('Error removing file: ' + error.code);
	});
}

function reset() {
	$('#toolbar_icons').hide();
	$('#toolbar_message').show();
	$('#largeImage').attr("src","images/logo.png");
}