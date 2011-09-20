<?php
	session_start();

    require_once('server/os.php');

    if(!class_exists('os')){ 
        die('os class is missing!'); 
    }

    $myOs= New os;	
    $myOs->start();
	
	$myOs->process();


//    $languaje = json_encode($myOs->lang["languaje"]);

//    echo($languaje);
    
?>