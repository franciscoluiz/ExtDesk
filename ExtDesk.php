<?php
    
    
    
     require_once('server/os.php');
	 if(!class_exists('os')){ die('os class is missing!'); }
    
	 $myOs= New os;	
	 $myOs->start();
	
	$languaje =json_encode($myOs->lang["languaje"]);
	
	echo($languaje);
	
	  
?>