<?php

	//uses_ http://www.phpclasses.org/package/2825-PHP-Perform-several-types-of-file-manipulation.html

	//include the class src
	include('server/lib/fileManager/filemanager_class_inc.php');
	//instantiate the class
	//$files = new filemanager;
	
	//$files->copyr("wizard.php", "wizard.phpX");
	//echo "echo";

	/*** Params ***/
	$moduleJs = "Ejemplo";
	$nameJs = "Ejemplo";
	$iconClass = "ejemplo-shortcut";
	$module = "ejemplo-win";
	$iconLaunch ="icon-ejemplo";
	
	
	$template="Basic";
	$server=true;	
	// paths...
	
	$p1="modules/$moduleJs";
	$p2="modules/$moduleJs/Client";
	$p3="modules/$moduleJs/Client/Resources";
	$p4="modules/$moduleJs/Client/Resources/images";
	if($server){
		$p5="modules/$moduleJs/Server";
	}
	
	// create dirs....
	$files = new filemanager;
	
	$log="";
	if(!is_dir($p1)){
		//create the permision
		mkdir($p1);		
		mkdir($p2);
		mkdir($p3);
		mkdir($p4);
		mkdir($p5);
		
		//make to writable
		$files->changeMode($p1,0777);
		$files->changeMode($p2,0777);
		$files->changeMode($p3,0777);
		$files->changeMode($p4,0777);		
		if($server){
			$files->changeMode($p5,0777);			
		}
		
		//Copy the files
		if (!is_file($p2."/$moduleJs.js")){
			$files->copyr("modules/wizard/Client/Resources/Templates/$template/module.jst", "$p2/$moduleJs.js");
		}else{
			$log="existe el archivo js";
		}
	
		if (!is_file($p4."/".$moduleJs."_16x16.png")){
			$files->copyr("modules/wizard/Client/Resources/Templates/$template/module_16x16.png",$p4."/".$moduleJs."_16x16.png");
		}else{
			$log="existe el archivo 16x16";
		}
		
		if (!is_file($p4."/".$moduleJs."_48x48.png")){
			$files->copyr("modules/wizard/Client/Resources/Templates/$template/module_48x48.png",$p4."/".$moduleJs."_48x48.png");
		}else{
			$log="existe el archivo 48x48";
		}

		if (!is_file($p3."/$moduleJs.css")){
			$files->copyr("modules/wizard/Client/Resources/Templates/$template/module.cst", "$p3/$moduleJs.css");
		}else{
			$log="existe el archivo css";
		}
				
		
		
		
		if($server){
			if (!is_file($p5."/$moduleJs.php")){
				$files->copyr("modules/wizard/Client/Resources/Templates/$template/server.pht", "$p5/$moduleJs.php");
			}else{
				$log="existe el archivo css";
			}
		}
		
		// "Module".js
		
		//read the entire string
		$str=implode(file("$p2/$moduleJs.js"));
		$fp=fopen("$p2/$moduleJs.js",'w');
		$str=str_replace('<!-MODULE-!>',$moduleJs,$str);
		$str=str_replace('<!-IDWIN-!>',$module,$str);
		$str=str_replace('<!-NAME-!>',$nameJs,$str);
		$str=str_replace('<!-ICON-!>',$iconLaunch,$str);
		fwrite($fp,$str,strlen($str));
		
		// "Module".css
		//read the entire string
		$str=implode(file("$p3/$moduleJs.css"));
		$fp=fopen("$p3/$moduleJs.css",'w');
		$str=str_replace('<!-ICON-!>',$iconClass,$str);
		$str=str_replace('<!-ICONLAUNCH-!>',$iconLaunch,$str);
		$str=str_replace('<!-IMG16-!>',$moduleJs."_16x16.png",$str);
		$str=str_replace('<!-IMG48-!>',$moduleJs."_48x48.png",$str);
				
		fwrite($fp,$str,strlen($str));
			
			
		$log.="Creado dir : $p1";
	}else{
		echo "existe";		
	}

	echo $log;


	



?>