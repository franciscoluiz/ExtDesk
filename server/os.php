<?php

class os {

    public function load($path, $class = "", $check = true) {
        require_once($path);
        if ($check) {
            if (!class_exists($class)) {
                die("$class class is missing!");
            }
        }
    }

    public function start() {

        /*         * * Paths of system ** */
        $this->libPath = 'server/lib/';
        $this->incPath = 'server/include/';
        $this->incLang = 'client/languajes/';

        /*         * * Loading libraries ** */
        $this->load($this->incPath . 'class.configFile.php', 'configFile', true);
        $this->load($this->incPath . 'class.utils.php', 'utils', true);
        $this->load($this->incPath . 'class.security.php', 'Settings', true);
        $this->load($this->incPath . 'class.user.php', 'security', true);
        $this->load($this->incPath . 'class.modules.php', 'security', true);

        /*         * * Load in SESSION var ** */
        $this->iniConfig = new configFile();

        /*         * * Load the languaje file definided in config.ini** */
        $this->utils = new utils;
        $this->lang = $this->utils->loadJson($this->incLang . _LANGUAGE . '.json');

        /*         * * if debug is 1, then load de firePHP** */
        if (_DEBUG == '1') {
            $this->load($this->libPath . "FirePHPCore/FirePHP.class.php", 'FirePHP', true);
        }
        $this->load($this->incPath . "class.debug.php", 'debug', true);
        $this->debug = new debug;
    }

    public function process() {

        //load de security class
        $sec = new security;

        // if the user data send user and password post...!!
        if (!empty($_POST) && !empty($_POST["user"]) && !empty($_POST["password"])) {
            //we try to log in...!!
            $res = $sec->login($_POST["user"], $_POST["password"]);
        }

        // verify if we are login, this check session, and check 
        $res = $sec->loged();

        if ($res["success"]) {

            //check the action we need
            //$this->debug->log($_GET);


            $Module = null;
            $option = null;
            $action = null;
            
            if (isset($_GET["Module"])) { 
                $Module = $_GET["Module"]; 
            }
            if (isset($_GET["option"])) { 
                $option = $_GET["option"]; 
            }
            if (isset($_GET["action"])) { 
                $action = $_GET["action"]; 
            }
            
            if (isset($_POST["Module"])) { 
                $Module = $_POST["Module"]; 
            }
            if (isset($_POST["option"])) { 
                $option = $_POST["option"]; 
            }
            if (isset($_POST["action"])) { 
                $action = $_POST["action"]; 
            }
            
        
            
            switch ($Module) {

                case "Main" :
                    switch ($action) {
                        case "load_user":
                            // we get the languaje strings
                            $languaje = json_encode($this->lang["languaje"]);

                            // send a ok signal
                            $json = '{"success" : true, "login": true,';

                            // we print user data
                            $json = $json . '"user" : [{' . $sec->print_user();
                            $json = $json . '"strings":' . $languaje . ",";
                            $modules = new modules;
                            $moduleStr = $modules->getUserModules();
                            $json = $json . '"modules": ' . $moduleStr . ' }  ]}';
                            echo $json;
                            break;
                    }//<--end case action
                    break;
                default:
                    //first check the user permisión
                    //this is a generic function
                    $modules = new modules;
                    $permision = $modules->checkPermision();

                    //KILL THIS FUCKING LINE IS JUST TO TEST
                    //$permision=1;
                    //$this->debug->log(var_dump($permision));
                    if ($permision == 1) {

                        switch ($Module) {
                            case 'Settings':
                                switch ($option) {
                                    case 'Wallpaper':
                                        if ($action = "save") {
                                            $isSet = $modules->saveWallpaper();
                                            if (!$isSet) {
                                                echo '{success:false, msg:"No se realizaron los cambios en el servidor"}';
                                            } else {
                                                echo '{success:true, msg:"Guardado"}';
                                            }
                                        }
                                        break;
                                    case "Shortcuts":
                                        if ($action = "save") {
                                            $isSet = $modules->saveShortcuts();
                                            if (!$isSet) {
                                                echo '{success:false, msg:"No se realizaron los cambios en el servidor"}';
                                            } else {
                                                echo '{success:true, msg:"Guardado"}';
                                            }
                                        }
                                        break;
                                    case "QLaunchs":
                                        if ($action = "save") {
                                            $isSet = $modules->saveQLaunchs();
                                            if (!$isSet) {
                                                echo '{success:false, msg:"No se realizaron los cambios en el servidor"}';
                                            } else {
                                                echo '{success:true, msg:"Guardado"}';
                                            }
                                        }
                                        break;
                                    case 'Theme':
                                        if ($action = "save") {
                                            $isSet = $modules->saveTheme();
                                            if (!$isSet) {
                                                echo '{success:false, msg:"No se realizaron los cambios en el servidor"}';
                                            } else {
                                                echo '{success:true, msg:"Guardado"}';
                                            }
                                        }
                                        break;
                                }//<--end case option
                                break;
                            default:

                                // if we have access,
                                // 1.- Load the class, we create the path for you
                                // 2.- We inicialize the class for you
                                // 3.- We call the method for you...

                                //$Module = $Module;
                                //$option = $option;
                                //$action = $action;
                                $lower = strtolower($Module);
                                $Path = "modules/$Module/Server/$Module.php";

                                $initClass = "$" . $lower . "= new $Module;";
                                $Function = "$" . "$lower->$option" . "_$action();";
                                $this->load($Path, 'configFile', true);
                                if (class_exists($Module)) {
                                    eval($initClass);
                                    $variable = $lower;
                                    $method = $option . "_$action";
                                    if (method_exists(($lower), $method)) {
                                        eval($Function);
                                    } else {
                                        die('{"success" : false,msg:"The method does not exist."}');
                                    }
                                } else {
                                    die('{"success" : true,msg:"saved"}');
                                }
                                break;
                        }//<--end case Module
                    } else {
                        //you can in
                        echo '{success:false, msg:"No tienes los permisos necesarios<br/><br/>Por favor consulta con tu administrador"}';
                    }//end if permision

                    break;
            }//end case Module
        } else {
            // we are not logged
            // just send de languaje strings...
            $languaje = json_encode($this->lang["languaje"]);
            $json = '{"success" : false, "login": false,';
            $json = $json . '"user" : [{';
            $json = $json . '"strings":' . $languaje . "}]}";

            //OutPut Json
            echo $json;
        }//<-- end if ($res["success"])
    }

//<-- end function process
}