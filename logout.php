<?php
	session_start();
	
	$_SESSION = array(); //destroy all of the session variables
    session_destroy();
?>

{"success" : true}