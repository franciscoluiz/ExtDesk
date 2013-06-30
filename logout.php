<?php
	session_start();
	
	require_once("server/include/config.php");
	require_once("server/include/class.log.php");
	$user = $_SESSION["ExtDeskSession"]["username"];
    	$log=new log();
    
    	$log->save($user,"leaving the system","system");    
    
	$_SESSION = array(); //destroy all of the session variables
    session_destroy();
?>

{"success" : true}