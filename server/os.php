<?php

    class os {

        public function load($path,$class="",$check=true){
            require_once($path);
            if ($check){
                if(!class_exists($class)){
                    die("$class class is missing!");
                }
            }
        }

        public function start() {

            /*** Paths of system ***/
            $this->libPath = 'server/lib/';
            $this->incPath = 'server/include/';
            $this->incLang = 'client/languajes/';

            /*** Loading libraries ***/
            $this->load($this->incPath.'class.configFile.php','configFile',true);
            $this->load($this->incPath.'class.utils.php','utils',true);
			$this->load($this->incPath.'class.security.php','Settings',true);
			$this->load($this->incPath.'class.user.php','security',true);
			$this->load($this->incPath.'class.modules.php','security',true);

            /*** Load in SESSION var ***/
            $this->iniConfig=new configFile();

            /*** Load the languaje file definided in config.ini***/
            $this->utils =	new utils;
            $this->lang  = $this->utils->loadJson($this->incLang.$_SESSION['ExtDesk']['lang'].'.json');
			
			/*** if debug is 1, then load de firePHP***/
			if ($_SESSION['ExtDesk']['debug']=='1'){
				$this->load($this->libPath."FirePHPCore/FirePHP.class.php",'FirePHP',true);
			}
			$this->load($this->incPath."class.debug.php",'debug',true);
			$this->debug= new debug;
        }

		public function process(){

			//load de security class
			$sec= new security;

			// if the user data send user and password post...!!
			if (!empty($_POST)&& !empty($_POST["user"]) && !empty($_POST["password"])) {
				//we try to log in...!!
				$res=$sec->login($_POST["user"], $_POST["password"]);
			}

			// verify if we are login, this check session, and check 
			$res=$sec->loged();

			if ($res["success"]){
	
				//check te action we need	
				$this->debug->log($_GET);
				
				switch ($_GET["Module"]) {
					
					case "Main" :
								switch ($_GET["action"]) {
									case "load_user":
										// we get the languaje strings
										$languaje =json_encode($this->lang["languaje"]);
						
										// send a ok signal
										$json= '{	"success" : true, "login": true,';
										
										// we print user data
										$json=$json.'"user" : [{'.$sec->print_user();
										$json=$json.'"strings":'.$languaje.",";
										$modules= new modules;
										$moduleStr=$modules->getUserModules();
										$json=$json.'"modules": '.$moduleStr.' }  ]}';
										echo $json;
										break;
								}//<--end case action
								break;
					default:
								//first check the user permision
								//this is a generic function
								$modules= new modules;
								$permision=$modules->checkPermision();
								
								//$this->debug->log(var_dump($permision));
								if ($permision==1){
									
									switch ($_GET['Module']) {
										case 'Settings':
											switch ($_GET['option']) {
												case 'Wallpaper': 
															if ($_GET['action']="save"){
																$isSet=$modules->saveWallpaper();
																if (!$isSet){
																	echo '{success:false, msg:"No se realizaron los cambios en el servidor"}';
																}else{
																	echo '{success:true, msg:"Guardado"}';
																}	
															}
															
															
															break;
												
											}//<--end case option
											
											break;										
										default:											
											break;
									}//<--end case Module
																		
								}else{
									//you can in
									
									echo '{success:false, msg:"No tienes los permisos necesarios<br/><br/>Por favor conulta con tu administrador"}';
									
								}//end if permision
									
							break;
					}//end case Module
				
			
			}else {
				// we are not logged
				// just send de languaje strings...
				$languaje =json_encode($this->lang["languaje"]);
				$json= '{	"success" : false, "login": false,';
				$json=$json.'"user" : [{';
				$json=$json.'"strings":'.$languaje."}]}";

				//OutPut Json
				echo $json;
			}//<-- end if ($res["success"])
		}//<-- end function process
   }
