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
            $this->load($this->incPath."class.configFile.php",'configFile',true);
            $this->load($this->incPath."class.utils.php",'utils',true);
			$this->load($this->incPath."class.security.php",'Settings',true);
			$this->load($this->incPath."class.user.php",'security',true);

            /*** Load in SESSION var ***/
            $this->iniConfig=new configFile();

            /*** Load the languaje file definided in config.ini***/
            $this->utils =	new utils;
            $this->lang  = $this->utils->loadJson($this->incLang.$_SESSION["ExtDesk"]["lang"].".json");

        }

		public function process(){

			//load de security class
			$sec= new security;

			// if the user data send user and password post...!!
			if (!empty($_POST)&& !empty($_POST["user"]) && !empty($_POST["password"])) {
				//we try to log in...!!
				$res=$sec->login($_POST["user"], $_POST["password"]);
			}

			// verify if we are login
			$res=$sec->loged();

			if ($res["success"]){
				// we get the languaje strings
				$languaje =json_encode($this->lang["languaje"]);

				// send a ok signal
				$json= '{	"success" : true, "login": true,';

				// we print user data
				$json=$json.'"user" : [{'.$sec->print_user();
				$json=$json.'"strings":'.$languaje.",";

				// we print the modules, we need change this part.... dirty way to test

				$json=$json.'"modules"          : [
				        {"js" : "Notepad", 			"name" : "Notepad",				"iconCls":"notepad-shortcut",		"module":"notepad",			"shorcut":true, 	"qLaunch":true, 	"iconLaunch" :"icon-notepad"},
				        {"js" : "AccordionWindow",	"name" : "Accordion Window",	"iconCls":"accordion-shortcut",		"module":"acc-win",			"shorcut":true, 	"qLaunch":true, 	"iconLaunch" :"icon-accordion"},
				        {"js" : "GridWindow",			"name" : "Grid Window",			"iconCls":"grid-shortcut",		"module":"grid-win",  		"shorcut":true, 	"qLaunch":true, 	"iconLaunch" :"icon-grid"},
				        {"js" : "SystemStatus",		"name" : "System Status",		"iconCls":"systemStatus-shortcut",	"module":"systemstatus",	"shorcut":true, 	"qLaunch":true,		"iconLaunch" :"icon-systemStatus"},
				        {"js" : "TabWindow",			"name" : "Tab Window",			"iconCls":"tab-shortcut",		"module":"tab-win",  		"shorcut":true,		"qLaunch":false, 	"iconLaunch" :"icon-tab"},
				        {"js" : "BogusModule",		"name" : "Bogus Module",		"iconCls":"bugus-shortcut",			"module":"bogus-menu",  	"shorcut":false,	"qLaunch":false, 	"iconLaunch" :""},
				        {"js" : "BogusMenuModule",	"name" : "Bogus Menu Module",	"iconCls":"bugus-shortcut",			"module":"bogus-menu",  	"shorcut":false,	"qLaunch":false, 	"iconLaunch" :"icon-bugus"},
				        {"js" : "Example",			"name" : "Example",			"iconCls":"example-shortcut",		"module":"example-win",  		"shorcut":true, 	"qLaunch":true, 	"iconLaunch" :"icon-example"},
				        					    ]
					}
					] }';

				// yahoo...!!
				echo $json;


			}else{
				// we are not logged

				// just send de langjuage strings...
				$languaje =json_encode($this->lang["languaje"]);
				$json= '{	"success" : false, "login": false,';
				$json=$json.'"user" : [{';
				$json=$json.'"strings":'.$languaje."}]}";

				echo $json;
			}
		}

    }