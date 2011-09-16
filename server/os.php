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

            /*** Load in SESSION var ***/
            $this->iniConfig=new configFile();

            /*** Load the languaje file definided in config.ini***/			
            $this->utils =	new utils;
            $this->lang  = $this->utils->loadJson($this->incLang.$_SESSION["ExtDesk"]["lang"].".json");						

        } 

        public function login($user,$password){

        }

    }

?>