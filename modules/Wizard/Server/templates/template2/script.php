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
        


        //loop yahoos!!
        $l=$_GET["p1"];

        //LOOP 1        
            $file_lopp1 = $path."/Client/loop1.txt";
            $loop1=file_get_contents($file_lopp1);
            $loop1_f=str_replace('--[module]--', $module,  $loop1);
            $loop1_f=str_replace('--[moduleLow]--', $moduleLow,  $loop1_f);
        
            $loopstr1="";
            for ($i=1; $i<$l+1 ;$i++){
                $loopstr1 = $loopstr1.str_replace('--[count]--', $i,  $loop1_f);
            }
            //echo ($loopstr1);

        //LOOP 2        
            $file_lopp2  = $path."/Client/loop2.txt";
            $loop2 = file_get_contents($file_lopp2);
       
            $loopstr2="";
            for ($i=1; $i<$l+1 ;$i++){
                $temp = str_replace('--[count]--', $i,  $loop2);
                $temp = str_replace('--[count-1]--', $i-1,  $temp);
                
                $loopstr2 = $loopstr2.$temp;
                

            }
            //echo ($loopstr2);

        //LOOP 3        
            $file_lopp3 = $path."/Client/loop3.txt";
            $loop3 = file_get_contents($file_lopp3);
            $loop3_f = str_replace('--[module]--', $module,  $loop3);
            $loop3_f = str_replace('--[moduleLow]--', $moduleLow,  $loop3_f);
        
            $loopstr3 = "";
            for ($i=1; $i<$l+1 ;$i++){
                $loopstr3 = $loopstr3.str_replace('--[count]--', $i,  $loop3_f);
            }
            //echo ($loopstr3);
        
        $archivoNew=str_replace('--[module]--', $module, $archivo);
        $archivoNew=str_replace('--[moduleLow]--', $moduleLow, $archivoNew);
        
        $archivoNew=str_replace('--[loop1]--', $loopstr1, $archivoNew);
        $archivoNew=str_replace('--[loop2]--', $loopstr2, $archivoNew);
        $archivoNew=str_replace('--[loop3]--', $loopstr3, $archivoNew);
        
        file_put_contents($js, $archivoNew);


        //fix css file;        
        $css= $path."/Client/Resources/".$module.".css";        
        $archivo = file_get_contents($css);        
        $archivoNew=str_replace('--[moduleLow]--', $moduleLow, $archivo);
        file_put_contents($css, $archivoNew);


        //delete extra files
        unlink($path."/screenshot.png");      
        unlink($path."/script.php");
        unlink($path."/Client/loop1.txt");		
        unlink($path."/Client/loop2.txt");		
        unlink($path."/Client/loop3.txt");		
    
     
  ?>