<?php
    //sleep(0.5);

    //var_dump($_POST);

    session_start();
    
    if(!empty($_SESSION['ExtDeskSession']['logged'])) {
        //var_dump($_SESSION);
        echo '{	"success" : true, "login": true,';
        
    } else {

        if (empty($_POST)) {
            echo '{	"success" : false, "login": false,';
        } else {
            echo '{	"success" : true, "login": true,';
            //session_start();
            //$_SESSION['logged'] = 'si';
            $_SESSION['ExtDeskSession']['logged'] = 'si';
        }
    }

    require_once('server/os.php');
    
    if(!class_exists('os')) { 
        die('os class is missing!'); 
    }

    $myOs= New os;	
    $myOs->start();
    $languaje =json_encode($myOs->lang["languaje"]);

?>

"user" : [
{		 
    "id"               : "1",
    "name"             : "Pancho Lopez",
    "wallPaper"        : "desktop",
    "wallpaperStretch" : true,
    "strings"          : <?php echo $languaje;?>,
    "modules"          : [
        {js : "Notepad", 			"name" : "Notepad",				iconCls:"notepad-shortcut",			module:"notepad",		shorcut:true, 	qLaunch:true, 	iconLaunch :'icon-notepad'},
        {js : "AccordionWindow",	"name" : "Accordion Window",	iconCls:"accordion-shortcut",		module:"acc-win",		shorcut:true, 	qLaunch:true, 	iconLaunch :'icon-accordion'},					
        {js : "GridWindow",			"name" : "Grid Window",			iconCls:"grid-shortcut",			module:"grid-win",  	shorcut:true, 	qLaunch:true, 	iconLaunch :'icon-grid'},					
        {js : "SystemStatus",		"name" : "System Status",		iconCls:"systemStatus-shortcut",	module:"systemstatus",	shorcut:true, 	qLaunch:true,	iconLaunch :'icon-systemStatus'},					
        {js : "TabWindow",			"name" : "Tab Window",			iconCls:"tab-shortcut",				module:"tab-win",  		shorcut:true,	qLaunch:false, 	iconLaunch :'icon-tab'},					
        {js : "BogusModule",		"name" : "Bogus Module",		iconCls:"bugus-shortcut",			module:"bogus-menu",  	shorcut:false,	qLaunch:false, 	iconLaunch :''},
        {js : "BogusMenuModule",	"name" : "Bogus Menu Module",	iconCls:"bugus-shortcut",			module:"bogus-menu",  	shorcut:false,	qLaunch:false, 	iconLaunch :'icon-bugus'},
    ]
}

] }