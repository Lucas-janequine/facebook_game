// define la url del juego inicio
define ([
	'jquery',
	'social'
	], function ($,social){
		var juego = farm;
		
		var url="https://"+ juego +".patagoniaentertainment.com/game.do?type=FREE&pn=free&lang="
		var idioma = 'br';


		$( document ).ready(function() {

			FB.init({
				appId: 923504714405527,
				frictionlessRequests: true,
				status: true,
				version: 'v2.3'
			});
			FB.AppEvents.activateApp();

			FB.Canvas.setDoneLoading();
			FB.Canvas.setUrlHandler( urlHandler );

			FB.Event.subscribe('auth.authResponseChange', onAuthResponseChange);
			FB.Event.subscribe('auth.statusChange', onStatusChange);


			$('body').css('background-image', "url(Images/background/"+ juego +".jpg)");
			$('#iframe').attr('src',url + idioma);

			setTimeout(function () {
				newsletter(idioma);
			},150000);
		});
// define la url del juego final
function urlHandler(data) {
  // Called from either setUrlHandler or using window.location on load, so normalise the path
  var path = data.path || data;


  var request_ids = getParameterByName(path, 'request_ids');
  var latest_request_id = request_ids.split(',')[0];

  if (latest_request_id) {
    // Probably a challenge request. Play against sender
    getRequestInfo(latest_request_id, function(request) {
    	playAgainstSomeone(request.from.id);
    	deleteRequest(latest_request_id);
    });
}
}
$(document).ready(function(){
	$('#newsletter-signup').submit(function(){
		
		//check the form is not currently submitting
		if($(this).data('formstatus') !== 'submitting'){

			//setup variables
			var form = $(this),
			formData = form.serialize(),
			formUrl = form.attr('action'),
			formMethod = form.attr('method'), 
			responseMsg = $('#signup-response');
			
			//add status data to form
			form.data('formstatus','submitting');
			
			//show response message - waiting
			responseMsg.hide()
			.addClass('response-waiting')
			.text('Please Wait...')
			.fadeIn(200);
			
			//send data to server for validation
			$.ajax({
				url: formUrl,
				type: formMethod,
				data: formData,
				success:function(data){
					
					//setup variables
					var responseData = jQuery.parseJSON(data), 
					klass = '';
					
					//response conditional
					switch(responseData.status){
						case 'error':
						klass = 'response-error';
						break;
						case 'success':
						klass = 'response-success';
						setTimeout(function () {
							$('#layer-newsletter').removeClass().addClass('hide');
						},2000);
						break;	
					}
					
					//show reponse message
					responseMsg.fadeOut(200,function(){
						$(this).removeClass('response-waiting')
						.addClass(klass)
						.text(responseData.message)
						.fadeIn(200,function(){
								   //set timeout to hide response message
								   setTimeout(function(){
								   	responseMsg.fadeOut(200,function(){
								   		$(this).removeClass(klass);
								   		form.data('formstatus','idle');
								   	});
								   },3000)
								});
					});
				}
			});
		}
		
		//prevent form from submitting
		return false;
	});
$('#iframe').attr('src',url + 'br');
});
function Cambiaridioma(cual) {
	idioma = cual;
	console.log ("hehrherhehrherhherh");
	if (cual == 'es'){
		$('#idioma1').removeClass().addClass('actual flag es');
		$('#idioma2').removeClass().addClass('cambio1 flag en');
		$('#idioma3').removeClass().addClass('cambio2 flag br');
			        // newsletter
			        $('#newsletteres').removeClass().addClass('visible');
			        $('#newsletteren').removeClass().addClass('hide');
			        $('#newsletterbr').removeClass().addClass('hide');
			        $("#cambiar").text("Cambiar dioma");
			    }
			    else if (cual == 'en'){
			    	$('#idioma1').removeClass().addClass('cambio1 flag es');
			    	$('#idioma2').removeClass().addClass('actual flag en');
			    	$('#idioma3').removeClass().addClass('cambio2 flag br');
			        // newsletter
			        $('#newsletteres').removeClass().addClass('hide');
			        $('#newsletteren').removeClass().addClass('visible');
			        $('#newsletterbr').removeClass().addClass('hide');
			        $("#cambiar").text("Change language");
			    }
			    else if (cual == 'br'){
			    	$('#idioma1').removeClass().addClass('cambio1 flag es');      
			    	$('#idioma2').removeClass().addClass('cambio2 flag en');
			    	$('#idioma3').removeClass().addClass('actual flag br');
			        // newsletter
			        $('#newsletteres').removeClass().addClass('hide');
			        $('#newsletteren').removeClass().addClass('hide');
			        $('#newsletterbr').removeClass().addClass('visible');
			        $("#cambiar").text("Mudar língua");
			    }
			    $('#iframe').attr('src',url+cual);
			};

			function newsletter(idioma){
				if (idioma == 'es'){
					$('#layer-newsletter').removeClass().addClass('visible');
					$('#txt-newsletter').text('Subscrir al Newsletter');
					$('#txt-newsletter2').text('E-mail:');
					$('#txt-newsletter3').text('Nombre:');
					$('#signup-idioma').val("ES");
					$('#signup-button').val("Enviar");
				}
				else if (idioma == 'en'){
					$('#layer-newsletter').removeClass().addClass('visible');
					$('#txt-newsletter').text('Subscibe to Newsletter');
					$('#txt-newsletter2').text('E-mail:');
					$('#txt-newsletter3').text('Name:');
					$('#signup-idioma').val("EN");
					$('#signup-button').val("Send");
				}
				else if (idioma == 'br'){
					$('#layer-newsletter').removeClass().addClass('visible');
					$('#txt-newsletter').text('Assine a Newsletter');
					$('#txt-newsletter2').text('E-mail:');
					$('#txt-newsletter3').text('Nome:');
					$('#signup-idioma').val("BR");
					$('#signup-button').val("Enviar");
				}
			}
			function closeNews(){
				$('#layer-newsletter').removeClass().addClass('hide');
			}

			function golobby(param){
				$('body').css('background-image', "url(../imgs/background/"+ param +".jpg)");
				if (param == "lobby"){
					$('#iframe').attr('src','../lobby.php');
					$('#iframe').removeClass().addClass('hide');
					$('#lobby-layer').removeClass().addClass('visible');
				} else{
					url="https://"+ param +".patagoniaentertainment.com/game.do?type=FREE&pn=free&lang=";
					juego = param
					$('#iframe').removeClass().addClass('iframe visible');
					$('#iframe').attr('src',url+idioma);
					$('#lobby-layer').removeClass().addClass('hide');
				}
			}
		
		});