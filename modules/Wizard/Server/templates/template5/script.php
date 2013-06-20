<?php

    //name of new module   
    
    
    $module = $_SESSION["wizard_module"];
    $tpl = $_SESSION["wizard_template"];
    $moduleLow =strtolower($module);
    $path = "./modules/".$module;
    
    // fix paths
    
        //Javascript module
        $o = $path."/Client/$tpl.js";
        $d = $path."/Client/".$module.".js";
        rename($o, $d);
        
        //CSS module
        $o = $path."/Client/Resources/$tpl.css";
        $d = $path."/Client/Resources/".$module.".css";
        rename($o, $d);
        
        //icon 48 
        $o = $path."/Client/Resources/images/".$tpl."_16x16.png";
        $d = $path."/Client/Resources/images/".$moduleLow."_16x16.png";
        rename($o, $d);
    
        //icon 16
        $o = $path."/Client/Resources/images/".$tpl."_48x48.png";
        $d = $path."/Client/Resources/images/".$moduleLow."_48x48.png";
        rename($o, $d);


        //fix javascript file;        
        $js= $path."/Client/".$module.".js";        
        $archivo = file_get_contents($js);        
        $archivoNew=str_replace('--[module]--', $module, $archivo);
        $archivoNew=str_replace('--[moduleLow]--', $moduleLow, $archivoNew);
        file_put_contents($js, $archivoNew);

        //fix css file;        
        $css= $path."/Client/Resources/".$module.".css";        
        $archivo = file_get_contents($css);        
        $archivoNew=str_replace('--[moduleLow]--', $moduleLow, $archivo);
        file_put_contents($css, $archivoNew);


        //delete extrafiles
        unlink($path."/screenshot.png");      
        unlink($path."/script.php");
    
     
  ?>