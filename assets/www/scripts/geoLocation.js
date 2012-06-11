function onGeoSuccess(position) {
    alert( 'success' );

}


function onGeoError(error) {
    alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
}


function getLocation(){
	try{
	navigator.geolocation.getCurrentPosition(onGeoSuccess,onGeoError,{ enableHighAccuracy: true });
	}
	catch(error){
		alert('fail')
	}
}