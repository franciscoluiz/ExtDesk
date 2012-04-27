<?php

class configFile {

    private $fileName;
    private $datosIni;

    function __construct($fileName = "server/include/config.php") {
        //graba en la session los datos de los drivers

        if (file_exists("$fileName")) {
            require_once( $fileName );
        } else {
            die("{success:false, error:1,msg:'No existe el fichero de configuración'}");
        }
    }

}