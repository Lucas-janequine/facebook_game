<?
	
	//email signup ajax call
	if($_GET['action'] == 'facebook_signup'){
		
		mysql_connect('localhost','patagoniasite','U6HF1R0#%S1kvtt');  
		mysql_select_db('patagoni_fb');
		
		//sanitize data
		$email = mysql_real_escape_string($_POST['signup-email']);
		$name = mysql_real_escape_string($_POST['signup-name']);
		$date = date('Y-m-d');
		$time = date('H:i:s');		
		//validate email address - check if input was empty				
		$insertSignup = mysql_query("INSERT INTO Facebook_emails (f_name, f_email_address, f_date, f_time) VALUES ('$name','$email','$date','$time')");	
		exit;
	}
?>