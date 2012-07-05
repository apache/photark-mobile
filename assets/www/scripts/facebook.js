if ((typeof cordova == 'undefined') && (typeof Cordova == 'undefined')) alert('Cordova variable does not exist. Check that you have included cordova.js correctly');
if (typeof CDV == 'undefined') alert('CDV variable does not exist. Check that you have included cdv-plugin-fb-connect.js correctly');
if (typeof FB == 'undefined') alert('FB variable does not exist. Check that you have included the Facebook JS SDK file.');
					
FB.Event.subscribe('auth.login', function(response) {
	/*alert('auth.login event');*/
});
					
FB.Event.subscribe('auth.logout', function(response) {
		   alert('auth.logout event');
});
					
FB.Event.subscribe('auth.sessionChange', function(response) {
		   alert('auth.sessionChange event');
});
					
FB.Event.subscribe('auth.statusChange', function(response) {
		   /*alert('auth.statusChange event');*/
});
					
function getLoginStatus() {
		FB.getLoginStatus(function(response) {
		if (response.status == 'connected') 
		{
			alert('logged in');
		}
		else 
		{
			alert('not logged in');
		}
	});
}
var fdata;
var count=0;
function me(a) {
	FB.api('/me/photos?limit=8&offset='+a, { fields: 'id, name, picture' },  function(response) {
	if (response.error) {
	alert(JSON.stringify(response.error));
	} 
	else 
	{
			var data = document.getElementById('data');
			$('#facebookMore').remove();
			fdata=response.data;
			response.data.forEach(function(item) {
				var d = document.createElement('div');
				if(item.name===undefined)
				{
					d.innerHTML = "<img src="+item.picture+"/><br />"+"No caption";
				}
				else
				{
					d.innerHTML = "<img src="+item.picture+"/><br />"+item.name;
				}
				data.appendChild(d);
			});
	}
	count++;
	$('#data').append($('<a id="facebookMore" onclick="me(count*8)" />').text('More..'));
   });
}         
function login() {
	FB.login(
		function(response) {
		 if (response.session) {
			 alert('logged in');
		} else {
			 /*alert('not logged in');*/
		}
	 },
	 { scope: "user_photos" }
 );
}            
document.addEventListener('deviceready', function() {
						  try {
							  FB.init({ appId: "423746790989627", nativeInterface: CDV.FB, useCachedDialogs: false });
							  document.getElementById('data').innerHTML = "";
						  } catch (e) {
							  alert(e);
						  }
 }, false);