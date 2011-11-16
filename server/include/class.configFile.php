<?php

class configFile {

    private $fileName;
    private $datosIni;

    function __construct($fileName = "server/include/config.ini"){
        //graba en la session los datos de los drivers

        //if (empty($_SESSION)){
        //	session_start();
        //}

        //echo $fileName;
        $this->datosIni = parse_ini_file($fileName,true);
        $_SESSION["ExtDesk"]=$this->datosIni["ExtDesk"];
        $_SESSION["drivers"]=$this->datosIni["drivers"];
        //session_write_close();
    }
}