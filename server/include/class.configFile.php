<?php
class configFile{
	private $nombreArchivo;
	private $datosIni;
	
	function __construct($nombreArchivo="server/include/config.ini"){
		//graba en la session los datos de los drivers
		
		//if (empty($_SESSION)){
		//	session_start();	
		//}
		
		//echo $nombreArchivo;
		$this->datosIni = parse_ini_file($nombreArchivo,true);		
		$_SESSION["ExtDesk"]=$this->datosIni["ExtDesk"];
		$_SESSION["drivers"]=$this->datosIni["drivers"];
		//session_write_close();
	}
}
?>