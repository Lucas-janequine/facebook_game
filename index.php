<?php
include("PHP/newsletter.php");
include("PHP/analytics.php");
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<link rel='stylesheet' href='../styles.css' type='text/css' media='all' />
 <script src="//connect.facebook.net/en_US/sdk.js"></script>

 <script type="text/javascript" src="social.js"></script>
<!-- We will get our jQuery from google -->
<script src="https://www.google.com/jsapi" type="text/javascript"></script>
<script type="text/javascript">
	google.load('jquery', '1.4.1');
</script>


<!-- ////////////////////////////////
////VARIABLES A DEFINIR - INICIO////////
/////////////////////////////// -->
<script type="text/javascript">

var juego="farm";

<?php include("PHP/javascript.php");?>
</script>
<!-- ////////////////////////////////
////VARIABLES A DEFINIR - FINAL////////
/////////////////////////////// -->

</head>
<body>
	<?php include("PHP/html_juego.php");?>
	<a class="banner_inf" href="http://superzodiacbingo.com/" target="_blank"><img src="HOTBINGO-800x90-br.gif" width="800px"></a>

</body>
</html>
