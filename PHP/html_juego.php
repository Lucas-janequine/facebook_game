<!-- Newsletter -->
		<div id="layer-newsletter" class="hide">
			<form id="newsletter-signup" action="?action=signup" method="post">
			    <fieldset>
			    	<a class="close" onclick="javascript:closeNews();" ></a>
			    	<img src="../imgs/newsletter.jpg">
			        <br><br><label for="signup-email" id="txt-newsletter">Subscrir al Newsletter:</label>
			        <br><br><label id="txt-newsletter2">E-mail:</label>
			        <input type="text" name="signup-email" id="signup-email" />
			        <label id="txt-newsletter3">Nombre:</label>
			        <input type="text" name="signup-name" id="signup-name" />
			        <input type="hidden" name="signup-idioma" id="signup-idioma" />
			        <p id="signup-response"></p>
			        <input type="submit" id="signup-button" value="Send" />
			    </fieldset>
			</form>
		</div>

		<iframe id="iframe" class="iframe" src=""></iframe>
		<!-- lobby inicia -->
		<div id="lobby-layer" class="hide">
			<a id="juego2" onclick="javascript:golobby('shb');" class="thumbs"><img src="../imgs/thumbs/superhot.jpg"><br>Super Hot Bingo</a>
			<a id="juego4" onclick="javascript:golobby('zb');" class="thumbs"><img src="../imgs/thumbs/zodiac.jpg"><br>Zodiac Bingo</a>
			<a id="juego5" onclick="javascript:golobby('pb');" class="thumbs"><img src="../imgs/thumbs/piratas.jpg"><br>Pirates Bingo</a>
			<a id="juego3" onclick="javascript:golobby('sbp');" class="thumbs"><img src="../imgs/thumbs/showball.jpg"><br>Show Ball +</a>
			<a id="juego1" onclick="javascript:golobby('farm');" class="thumbs"><img src="../imgs/thumbs/farm.jpg"><br>Fazenda Bingo</a>
			<a id="juego6" onclick="javascript:golobby('gb');" class="thumbs"><img src="../imgs/thumbs/gol.jpg"><br>Gol Bingo</a>
		</div>
		<div class="menu">
			<!-- arranca idioma -->
			<div class="lengua">
				<a onclick="javascript:Cambiaridioma('es');" id="idioma1" class="cambio2 flag es"></a>
				<a onclick="javascript:Cambiaridioma('en');" id="idioma2" class="cambio1 flag en"></a>
				<a onclick="javascript:Cambiaridioma('br');" id="idioma3" class="actual flag br"></a>
				<span id="cambiar">Mudar língua</span>
			</div>
			<!-- termina idioma -->
				<a id="newsletteres" class="hide" onclick="javascript:newsletter('es');">&raquo; Recibir Promociones</a>
			<a id="newsletteren" class="hide" onclick="javascript:newsletter('en');">&raquo; Receive Promotions</a>
			<a id="newsletterbr" class="visible" onclick="javascript:newsletter('br');">&raquo; Receba Promo&ccedil;&otilde;es</a>
			<a id="lobby" class="lobby" onclick="javascript:golobby('lobby');">» BINGO LOBBY</a>
			
		</div>