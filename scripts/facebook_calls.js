var uid;
var accessToken;
var swfTarget = "flashcontent";

var dataArray = new Array();

function getMovie(movieName) 
{
    if (navigator.appName.indexOf("Microsoft") != -1) 
    {
        return window[movieName];
    } 
    else 
    {
        return document[movieName];
    }
    
}
 
function getUserToken(){
	FB.Canvas.setAutoGrow(2);
	// In your onload handler add this call
	FB.Event.subscribe('edge.create', 
		function(href, widget) {
			document.getElementById('flashcontent').popupLikeCallback(true);
			$('.btnLike').css('display','none');
		}
	);

	FB.getLoginStatus(function(response) {
	  if (response.status === 'connected') {
		uid = response.authResponse.userID;
		accessToken = response.authResponse.accessToken;
		getMovie(swfTarget).FBInitCallback(response.authResponse, null);		
	  } else if (response.status === 'not_authorized') {
		getMovie(swfTarget).FBInitCallback(null, {response:'error', code:'0'});
	  } else {
		getMovie(swfTarget).FBInitCallback(null, {response:'error', code:'1'});
	  }
	});
 
}

function getMe() {

	FB.api('/me?fields=id,name,email,location,age_range,gender,birthday,first_name,last_name,locale', function(response) {

		getMovie(swfTarget).FBMeCallback(response, null);
		
	});
	
}

function getInvitableFriends() {
	FB.api('/me/invitable_friends', function(response) {
		getMovie(swfTarget).FBInvitableFriendsCallback(response, null);
	});

}

function getInvitableFriendsExcluded(excluded) {
	FB.api("/me/invitable_friends?excluded_ids=["+excluded+"]", function(response) {
		getMovie(swfTarget).FBInvitableFriendsExcludedCallback(response, null);
	});

}

/*

function getInstalledFriends() {
	FB.api('/me/friends?fields=name,id,picture.height(150).width(150)&access_token='+accessToken, function(response) {
		getMovie(swfTarget).FBInstalledFriendsCallback(response, null);
	});
}
function getNext(uriCall){
	FB.api(uriCall, function(response) {
		getMovie(swfTarget).FBGetNextInstalledFriendsCallback(response, null);
	});
}
*/

var dataArray;
function getInstalledFriends() {
	dataArray = new Array();
	var installedFriends = new Object();
	FB.api('/me/friends?fields=name,id,picture.height(150).width(150)&access_token='+accessToken, function(response) {
		if(response.data){
			for(var i = 0 ; i < response.data.length ; i++){
				dataArray.push(response.data[i]);
			}
			getNext(response);
		}
		
	});
}

function getNext(response){
	if(response.paging){
		if(response.paging.next){
			FB.api(response.paging.next, function(response) {
				if(response.data){
					for(var i = 0 ; i < response.data.length ; i++){
						dataArray.push(response.data[i]);
					}
					getNext(response);
				}
			});
		}else{
			var out = new Object();
			out.data = dataArray;
			getMovie(swfTarget).FBInstalledFriendsCallback(out, null);
			return;
		}
	}else{
		var out = new Object();
		out.data = dataArray;
		getMovie(swfTarget).FBInstalledFriendsCallback(out, null);
		return;
	}
	
}




function getLeaderNames(leaderList, callBack) {

	FB.api('?ids='+leaderList+"&fields=id,name&access_token="+accessToken, function(response) {
		getMovie(swfTarget)[callBack](response, null);
	});	
	
}

function inviteFriends(data, inviteIDs) {
	FB.ui({method: 'apprequests',
	  message: data.message,
	  title: data.title,
	  filter: data.app_non_users,
	  to: inviteIDs
	}, function(response){
		getMovie(swfTarget).FBInviteFriendsCallback(response);
	});
		
}

function sendGift(data,inviteIDs) {
	FB.ui({method: 'apprequests',
	  message: data.message,
	  title: data.title,
	  to: inviteIDs
	}, function(response){
		getMovie(swfTarget).FBSendGiftCallback(response);
	});
	
}

function wallShare(data) {

	FB.ui({method: 'feed',
	  message: data.message,
	  link: data.link,
	  caption: data.caption,
	  name: data.name,		  
	  description: data.description,
	  picture: data.picture
	}, function(response){
		$(swfTarget).FBWallShareCallback(response, null);
	});
		
}

function buyProduct(data) {
	FB.ui({method:'pay.prompt',
		purchase_type:data.purchase_type,
		action:data.action,
		product:data.product
	}, function(response){
		$(swfTarget).FBBuyProductCallback(response, null);
	});
}

function deleteRequest(requestId) {
  FB.api(requestId, 'delete', function(response) {
  });
}