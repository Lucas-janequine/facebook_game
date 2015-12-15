define ([
	'jquery',
	'social',
	'sprites'

	], function ($,social,sprites){
		var ui = {
			init : function (){
				var model = this;
				model.currPage = 0;
				model.maxperpage = 8;

			},

		//Draw friends and invitable friends
		drawfriends : function (friends) {
			var model = this;
			var tempid = 0;
			var remaining = model.maxperpage - friends.length ;

			$( "body" ).append( "<div id='friend_container'></div>" );
			//Show a page of friend that plays the game
			for (var i = 0; i < friends.length; i++) {
				friends[i].first_name;
				tempid++;
				$( "#friend_container" ).append( "<div class='fb_friend ff" + tempid.toString() + "'> <div id='friend" + tempid.toString() + "'></div></div>" );
				$("#friend"+ tempid.toString ()).css({
					"background"		: "url('"+ friends[i].picture.data.url +"') no-repeat",
					"background-size"	: "contain",
					"height"			: sprites.invite_friends_icon.height,
					"width"			: sprites.invite_friends_icon.width
				});
				$( ".ff"+ tempid.toString() ).append( friends[i].first_name.toString() );
			};
			//If there are no friends left, invite them! 
			for (var i = 0; i < remaining; i++) {
				tempid++;
				$( "#friend_container" ).append( "<div class='fb_friend invite' id='friend"  + tempid.toString () + "'" + "></div>" );
				$("#friend" + tempid.toString ()).css({
					"background"		: "url('"+ "Images/" + sprites.invite_friends_icon.url +"') no-repeat",
					"background-size"	: "contain",
					
					"height"			: sprites.invite_friends_icon.height,
					"width"			: sprites.invite_friends_icon.width

				});

				$("#friend" + tempid.toString ()).click(function(event) {
					FB.ui({method: 'apprequests',
						message: 'YOUR_MESSAGE_HERE'
					}, function(response){
						console.log(response);
					});
				});


			};


		}


	}

	return ui;


});