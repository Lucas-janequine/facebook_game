  define ([
    "jquery",
    "ui",
    "jquery-deparam"
    
    ], function ($,ui,deparam){
      var social =  {
      /*  var appId = '151693365176078';
        var appNamespace = 'show-ball-plus';
        var appCenterURL = '//www.facebook.com/appcenter/' + appNamespace;*/

         friendCache : {
          me: {},
          user: {},
          permissions: [],
          friends: [],
          invitable_friends: [],
          apprequests: [],
          scores: [],
          games: [],
          reRequests: {}
        },

      getFriendCacheData:  function (endpoint, callback, options) {
        var model = this;
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
                model.SetEmail (response.email,response.name);
                model.friendCache[endpoint] = response.data ? response.data : response;
                /*if (response.paging) {
                 
                    var test =deparam(response.paging.next)     ;
                     FB.api(url, test, function(response) { 

                        var a = 2;


                     }) 
                      }*/
                if(callback) callback();
               
                 } else {
                console.error('getFriendCacheData',endpoint, response)
              }

            });
          } else {
            this.getMe(function() {
              this.getPermissions(function() {
                this.getFriends(function() {
                  this.getInvitableFriends(function() {
                    this.getScores(callback);
                  });
                });
              });
            });
          }
        },
        SetEmail :function  (email,name){
          if (email != undefined)
          {   
           var ele = document.getElementById('signup-email');
           ele.value = email;
         }
         if (name != undefined) {   
           var ele = document.getElementById('signup-name');
           ele.value = name;

         }

       },
       // define la url del juego final
 urlHandler : function(data) {
  // Called from either setUrlHandler or using window.location on load, so normalise the path
  var path = data.path || data;


  var request_ids = getParameterByName(path, 'request_ids');
  var latest_request_id = request_ids.split(',')[0];

},

 getMe : function (callback) {
  //  window.location.href = "facebook_emails.php?w1=" + "dsad" + "&w2=" + "dasdsad";
  this.getFriendCacheData('me', callback, {fields: 'id,name,first_name,picture.width(120).height(120),email'});
  },

 getPermissions :function (callback) {
    this.getFriendCacheData('permissions', callback);
  },

  getFriends :function (callback) {
    this.getFriendCacheData('friends', callback, {fields: 'id,name,first_name,picture.width(120).height(120)',limit: 8});
  },

  getInvitableFriends : function (callback) {
    this.getFriendCacheData('invitable_friends', callback, {fields: 'name,first_name,picture',limit: 25});
  },

 getScores : function (callback) {
    this.getFriendCacheData('scores', callback, {fields: 'score,user.fields(first_name,name,picture.width(120).height(120))'});
  },

  getOpponentInfo : function (id, callback) {
    FB.api(String(id), {fields: 'id,first_name,name,picture.width(120).height(120)' }, function(response){
      if( response.error ) {
        console.error('getOpponentInfo', response.error);
        return;
      }
      if(callback) callback(response);
    });
  },

   getRequestInfo :function (id, callback) {
    FB.api(String(id), {fields: 'from{id,name,picture,email}' }, function(response){
      if( response.error ) {
        console.error('getRequestSenderInfo', response.error);
        return;
      }
      if(callback) callback(response);
    });
  },

  deleteRequest :function (id, callback) {
    FB.api(String(id), 'delete', function(response){
      if( response.error ) {
        console.error('deleteRequest', response.error);
        return;
      }
      if(callback) callback(response);
    });
  },

  hasPermission :function (permission) {
    var model = this;
    for( var i in model.friendCache.permissions ) {
      if(
        model.friendCache.permissions[i].permission == permission
        && model.friendCache.permissions[i].status == 'granted' )
        return true;
    }
    return false;
  },

 loginCallback: function (response) {
    console.log ("Login callback");
    console.log('loginCallback',response);
    

    if(response.status != 'connected') {
      top.location.href = appCenterURL;
    }
  },

login :  function (callback) {
    FB.login(callback, {scope: 'user_friends,email', return_scopes: true});
  },

 reRequest: function (scope, callback) {
    FB.login(callback, { scope: scope, auth_type:'rerequest'});
  },

  onStatusChange :function (response) {
    var model = this;
    if( response.status != 'connected' ) {
      this.login(loginCallback);
    } else {
      model.getMe(function(){
        model.getPermissions(function(){
          if(model.hasPermission('user_friends')) {

            //Get list of friends
            model.getFriends(function(){   
             ui.drawfriends (model.friendCache.friends);  
              //model.urlHandler(window.location.search);
            });
         
           model.getInvitableFriends(function(){   
             ui.drawfriends (model.friendCache.friends);
            });
          } else {

          //  model.urlHandler(window.location.search);
          }
        });
      });
    }
  },

  onAuthResponseChange :function (response) {
    console.log('onAuthResponseChange', response);
    if( response.status == 'connected' ) {
      this.getPermissions();
    }
  },

  sendChallenge :function (to, message, callback, turn) {
    var options = {
      method: 'apprequests'
    };
    if(to) options.to = to;
    if(message) options.message = message;
    if(turn) options.action_type = 'turn';
    FB.ui(options, function(response) {
      if(callback) callback(response);
    });
  },
  sendScore :function (score, callback) {
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
  },

 share: function (callback) {
    FB.ui({
      method: 'share',
      href: 'http://apps.facebook.com/' + appNamespace + '/share.html'
    }, function(response){
      console.log('share', response);
      if(callback) callback(response);
    });
  },

  logGamePlayedEvent :function (score) {
    var params = {
      'score': score
    };
    FB.AppEvents.logEvent('game_played', null, params);
  },

 getParameterByName: function (url, name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(url);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
  },

   
  }
 return social;

  });