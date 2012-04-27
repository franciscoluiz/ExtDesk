<?php

class debug {

    private $active;
    private $firephp;

    function __construct() {
        if (_DEBUG == '1') {
            ob_start();
            $this->firephp = FirePHP::getInstance(true);
        }
    }

    function log($msg, $label = "") {
        if (_DEBUG == '1') {
            $this->firephp->log($msg, $label);
        }
    }

    function info($msg, $label = "") {
        if (_DEBUG == '1') {
            $this->firephp->info($msg, $label);
        }
    }

    function warn($msg, $label = "") {
        if (_DEBUG == '1') {
            $this->firephp->warn($msg, $label);
        }
    }

    function error($msg, $label = "") {
        if (_DEBUG == '1') {
            $this->firephp->error($msg, $label);
        }
    }

}