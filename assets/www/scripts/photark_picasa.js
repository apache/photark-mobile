/*Picasa Connect*/
var GOOGLE_AUTH_URL = "https://accounts.google.com/o/oauth2/auth";
var GOOGLE_TOKEN_URL = "https://accounts.google.com/o/oauth2/token";
var GOOGLE_CLIENT_ID = "694561233653-n00sia1lg2cces16024ac0nfuo37ulng.apps.googleusercontent.com";
var GOOGLE_CLIENT_SECRET='qaMMEsUoGJz9OlB0p3yCc0xU';
var PICASA_SCOPE = "https://picasaweb.google.com/data/";
var redirect_uri='urn:ietf:wg:oauth:2.0:oob';
var code='';
var access_token='';
var refresh_token='';
var start=-7;
function listing_photos(access_token,refresh_token){
	start=start+8;
	var photos_url='https://picasaweb.google.com/data/feed/api/user/default?kind=photo&thumbsize=104&max-results=8&start-index='+start+'&access_token='+access_token+'&fields=link[@rel="next"],entry(summary,media:group(media:thumbnail))';
	console.log(photos_url);
	$.ajax({
		type: "GET",
		url:photos_url,
		contentType: 'application/x-www-form-urlencoded',
		success: function(data) {
					$('#picasaMore').remove();
					$(data).find("entry").each(function()
					{
						if($(this).find('summary').text()==='')
						{
							$('#picasa').append('<div class="cell"><a href='+"#"+'><img class="image" src="'+$(this).find('thumbnail').attr('url')+'" /></a><br />No Caption<br /></div>');
						}
						else
						{
							console.log($(this).find('thumbnail').attr('url')+'----'+$(this).find('summary').text());
							$('#picasa').append('<div class="cell"><a href='+"#"+'><img class="image" src="'+$(this).find('thumbnail').attr('url')+'" /><br />'+$(this).find('summary').text().substr(0,20)+"..."+'<br /></div>');
						}
					});
					if($(data).find('link').attr('rel')!=undefined)
					{
						console.log($(data).find('link').attr('rel'));
						$('#picasa').append($('<a data-role="button" data-inline="true" data-theme="a" data-icon="arrow-d" data-iconpos="right" id="picasaMore" class="more" onclick="listing_photos(access_token,refresh_token);" />').text('More..'));
					}
				},
		error: function( error ){
						// Log any error.
						alert("ERROR:"+error.responseText);
				    	console.log( "ERROR:"+error.responseText);
						alert(JSON.stringify(error));
				},
		async:false
	});
}
function get_accesstoken(){
	code=prompt('Paste the authorization code received here.');
	console.log(code);
	var token_url=GOOGLE_TOKEN_URL;
	var token_data='code='+encodeURIComponent(code)+'&redirect_uri='+encodeURIComponent(redirect_uri)+'&client_id='+encodeURIComponent(GOOGLE_CLIENT_ID)+'&scope='+'&client_secret='+encodeURIComponent(GOOGLE_CLIENT_SECRET)+'&grant_type=authorization_code';
	console.log(token_url);
	$.ajax({
		type: "POST",
		url:token_url,
		contentType: 'application/x-www-form-urlencoded',
		data: token_data,
		success: function(data) {
					console.log(data);
					access_token=(data).access_token;
					refresh_token=(data).refresh_token;
					console.log(access_token);
					console.log(refresh_token);
					listing_photos(access_token,refresh_token);
				},
		error: function( error ){
						// Log any error.
						alert("ERROR:"+error.responseText);
				    	console.log( "ERROR:"+error.responseText);
						alert(JSON.stringify(error));
				},
		async:false
	});
}
$(document).ready(function() {
	$('#picasaSwitch').off('change');
	$("#picasa").empty();
	$('#picasaSwitch').on('change', function()
	{
		if($(this).val()==="off")
		{
			$("#picasa").empty();
		}
		else
		{
			var login_url=GOOGLE_AUTH_URL+'?scope='+PICASA_SCOPE+'&redirect_uri='+redirect_uri+'&response_type=code&client_id='+GOOGLE_CLIENT_ID+'&approval_prompt=force'+'&access_type=offline';
			console.log(login_url);
			window.plugins.childBrowser.showWebPage(login_url, { showLocationBar: true });
			window.plugins.childBrowser.onClose=get_accesstoken;
		}
	});
});
