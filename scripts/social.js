

var appId = '151693365176078';
var appNamespace = 'show-ball-plus';
var appCenterURL = '//www.facebook.com/appcenter/' + appNamespace;

var friendCache = {
  me: {},
  user: {},
  permissions: [],
  friends: [],
  invitable_friends: [],
  apprequests: [],
  scores: [],
  games: [],
  reRequests: {}
};

function getFriendCacheData(endpoint, callback, options) {
  if(endpoint) {
    var url = '/';
    if(endpoint == 'me') {
      url += endpoint;
    } else if(endpoint == 'scores') {
      url += appId + '/' + endpoint;
    } else {
      url += 'me/' + endpoint;
    }
    FB.api(url, options, function(response) {
      if( !response.error ) {
        console.log('getFriendCacheData',endpoint, response);
        SetEmail (response.email,response.name);
        friendCache[endpoint] = response.data ? response.data : response;
        if(callback) callback();
      } else {
        console.error('getFriendCacheData',endpoint, response)
      }
    });
  } else {
    getMe(function() {
      getPermissions(function() {
        getFriends(function() {
          getInvitableFriends(function() {
            getScores(callback);
          });
        });
      });
    });
  }
}
function SetEmail (email,name){
  if (email != undefined)
  {   
   var ele = document.getElementById('signup-email');
   ele.value = email;
  }
  if (name != undefined) {   
   var ele = document.getElementById('signup-name');
   ele.value = name;

  }

}

function getMe(callback) {
//  window.location.href = "facebook_emails.php?w1=" + "dsad" + "&w2=" + "dasdsad";
  getFriendCacheData('me', callback, {fields: 'id,name,first_name,picture.width(120).height(120),email'});
}

function getPermissions(callback) {
  getFriendCacheData('permissions', callback);
}

function getFriends(callback) {
  getFriendCacheData('friends', callback, {fields: 'id,name,first_name,picture.width(120).height(120)',limit: 8});
}

function getInvitableFriends(callback) {
  getFriendCacheData('invitable_friends', callback, {fields: 'name,first_name,picture',limit: 8});
}

function getScores(callback) {
  getFriendCacheData('scores', callback, {fields: 'score,user.fields(first_name,name,picture.width(120).height(120))'});
}

function getOpponentInfo(id, callback) {
  FB.api(String(id), {fields: 'id,first_name,name,picture.width(120).height(120)' }, function(response){
    if( response.error ) {
      console.error('getOpponentInfo', response.error);
      return;
    }
    if(callback) callback(response);
  });
}

function getRequestInfo(id, callback) {
  FB.api(String(id), {fields: 'from{id,name,picture,email}' }, function(response){
    if( response.error ) {
      console.error('getRequestSenderInfo', response.error);
      return;
    }
    if(callback) callback(response);
  });
}

function deleteRequest(id, callback) {
  FB.api(String(id), 'delete', function(response){
    if( response.error ) {
      console.error('deleteRequest', response.error);
      return;
    }
    if(callback) callback(response);
  });
}

function hasPermission(permission) {
  for( var i in friendCache.permissions ) {
    if(
      friendCache.permissions[i].permission == permission
      && friendCache.permissions[i].status == 'granted' )
      return true;
  }
  return false;
}

function loginCallback(response) {
  console.log ("Login callback");
  console.log('loginCallback',response);
  

  if(response.status != 'connected') {
    top.location.href = appCenterURL;
  }
}

function login(callback) {
  FB.login(callback, {scope: 'user_friends,email', return_scopes: true});
}

function reRequest(scope, callback) {
  FB.login(callback, { scope: scope, auth_type:'rerequest'});
}

function onStatusChange(response) {
  if( response.status != 'connected' ) {
    login(loginCallback);
  } else {
    getMe(function(){
      getPermissions(function(){
        if(hasPermission('user_friends')) {
          getFriends(function(){           
            urlHandler(window.location.search);
          });
        } else {
         
          urlHandler(window.location.search);
        }
      });
    });
  }
}

function onAuthResponseChange(response) {
  console.log('onAuthResponseChange', response);
  if( response.status == 'connected' ) {
    getPermissions();
  }
}

function sendChallenge(to, message, callback, turn) {
  var options = {
    method: 'apprequests'
  };
  if(to) options.to = to;
  if(message) options.message = message;
  if(turn) options.action_type = 'turn';
  FB.ui(options, function(response) {
    if(callback) callback(response);
  });
}





function sendScore(score, callback) {
  // Check current score, post new one only if it's higher
  FB.api('/me/scores', function(response) {
    if( response.data && response.data.score < score ) {
      FB.api('/me/scores', 'post', { score: score }, function(response) {
        if( response.error ) {
          console.error('sendScore failed',response);
        } else {
          console.log('Score posted to Facebook', response);
        }
        callback();
      });
    }
  });
}

function share(callback) {
  FB.ui({
    method: 'share',
    href: 'http://apps.facebook.com/' + appNamespace + '/share.html'
  }, function(response){
    console.log('share', response);
    if(callback) callback(response);
  });
}

function logGamePlayedEvent(score) {
  var params = {
    'score': score
  };
  FB.AppEvents.logEvent('game_played', null, params);
}

function getParameterByName(url, name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
      results = regex.exec(url);
  return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}