<?php
    
  

class Wizard{

    function __construct() {
        $server   = _DB_HOST;
        $driver   = _DB_DRIVER;
        $user     = _DB_USER;
        $password = _DB_PASSWORD;
        $dbname   = _DB_NAME;
        $dsn = "$driver:dbname=$dbname;host=$server";

        try {
            $this->dbh = new PDO($dsn, $user, $password);
        } catch (PDOException $e) {
            $result = array('success' => false, 'error' => '0', 'msg' => $e->getMessage());
            die(json_encode($result));
        }
    }

        
    function Module_Install($module){

        $d = new debug();
        $d->log("installing");
        $moduleLow =strtolower($module);
        $count_saved=0;
        
        $query = "INSERT INTO modules (js,name,iconCls,module,iconLaunch) 
        VALUES ('$module','$module','$moduleLow-shortcut','$moduleLow-win','icon-$moduleLow');";   
        $this->query = $this->dbh->prepare($query);

        if ($this->dbh->query($query)) {
            $count_saved++;
        }
        if ($count_saved != 0) {
            die ('{"success":true,msg:"El modulo  '.$module.' ha sido creado, felicidades."}');
        } else {
            $lastError = (implode(",", $this->dbh->errorInfo()));
            die ('{"success" : false,msg:"No data was saved, mysql says : <i>\'' . $lastError . '\'</i>"}');
        }
        $d->log($query);
        
    }
    
    function Module_Make(){

        // Params...
        $template_name = $_GET["template"];
        $module_get    = $_GET["newModule"];
        
        $module_install= $_GET["installModule"];

        $module_get = strtolower($module_get);
        $module_get = str_replace(' ', '', $module_get);
        $module_get = ucfirst($module_get);
        
        //check if we can write modules directory
        
        $nombre_archivo = 'modules/';
        if (is_writable($nombre_archivo)) {
                
            $module=ucfirst($module_get);
            $dir_dest = './modules/'.$module;
           
            // if exist we go to home... 
            if (!is_dir($dir_dest)){
                    
                // make the directory
                mkdir($dir_dest,0777);                
                
                // copy the template
                $util = new utils();                
                $util->recurse_copy("./modules/Wizard/Server/templates/$template_name",$dir_dest);
                
                // send dato to script.php via session
                $_SESSION["wizard_module"]=$module;
                $_SESSION["wizard_template"]=$template_name;
                
                //run script.php in wizard
                $file="./modules/Wizard/Server/templates/$template_name/script.php";                
                require_once($file);
                
                if ($module_install){
                        
                    $this->Module_install($module_get);
                    
                }else{
                    die ('{"success":true,msg:"El modulo  '.$module.' ha sido creado, felicidades."}');                    
                }
                
            }else{
                die ('{"success":false,msg:"El directorio ya existe, no se ha creado ningun modulo"}');            
            }
        } else {
            die ('{"success":false,msg:"El directorio ya existe, no se ha creado ningun modulo"}');
        }

    }
}

//$w=new Wizard();
//$w->Module_Make();

?>