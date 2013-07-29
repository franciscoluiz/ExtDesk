<?php
/*
This file is part of ExtDesk, and was generated with Wizard Module
GNU General Public License Usage
This file may be used under the terms of the GNU General Public License version 3.0 as published by the Free Software Foundation and appearing in the file LICENSE included in the packaging of this file.  Please review the following information to ensure the GNU General Public License version 3.0 requirements will be met: http://www.gnu.org/copyleft/gpl.html.
*/

class --[moduleLow]-- {
	function __construct() {
        $server   = _DB_HOST;
        $driver   = _DB_DRIVER;
        $user     = _DB_USER;
        $password = _DB_PASSWORD;
        $dbname   = _DB_NAME ;
        $dsn = "$driver:dbname=$dbname;host=$server";
        try {
			$this->dbh = new PDO($dsn, $user, $password);
        } catch (PDOException $e) {
            $result = array('success' => false, 'error' => '0', 'msg' => $e->getMessage());
            die(json_encode($result));
        }
	}

	function Table_List(){
		// you can pre-define the required property parameters
		$output["metaData"]["idProperty"]="id";
		$output["metaData"]["totalProperty"]="total";
		$output["metaData"]["successProperty"]="success";
		$output["metaData"]["root"]="data";

		// Model
		$output["metaData"]["fields"][]=array("name"=>"id",				"type"=>"int");
		$output["metaData"]["fields"][]=array("name"=>"data1",			"type"=>"string");
		$output["metaData"]["fields"][]=array("name"=>"data2",			"type"=>"string");

		// Column

		$output["columns"][]=array("dataIndex"=>"id",		"header"=>"Id",		"hidden" =>false,	"width"=>60);
		$output["columns"][]=array("dataIndex"=>"data1",	"header"=>"Data 1",	"hidden" =>false,	"width"=>60, "editor"=>array("xtype"=>'textfield','allowBlank'=>false));		
		$output["columns"][]=array("dataIndex"=>"data2",	"header"=>"Data 2","sortable" => false,"width"=>200, "editor"=>array("xtype"=>'textfield','allowBlank'=>false));

		$start = (($_GET['page']-1)*$_GET['limit'])-0;
		$limit = $_GET['limit'];
	
		// principal Query
		$sql = " select id,col1 as data1, col2 as data2 from exampledata 
				limit $start,$limit;";

		// return the Query
		$stmt = $this->dbh->prepare($sql);
		$stmt->execute();
		$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
		
		//$d=new debug();
		//$d->log($sql);
		//$d->log($result);

       	// the total count
		$sql ="SELECT COUNT(id) AS total FROM exampledata";
        $stmt = $this->dbh->prepare($sql);
        $stmt->execute();
		$result_count = $stmt->fetchAll(PDO::FETCH_ASSOC);
		$total = $result_count[0]['total'];

		// the misc properties
		$output["total"] = $total;
		$output["success"] = true;
		$output["message"] = "success";
		$output["data"]=$result;

		// output the value
		echo json_encode($output);

	} 

	function Table_Save(){

		if(get_magic_quotes_gpc()){
            $post = json_decode(stripslashes($_GET["jsonp"]));
		}else{
            $post = json_decode($_GET["jsonp"]);
		}
		
		$saved=0;
		
		foreach ($post as $key) {
			
			$p1=$key->id;
			$p2=$key->data1;
			$p3=$key->data2;
			
			$sqlInsert="INSERT INTO exampledata (col1,col2) VALUES ('$p2','$p3');";
		
			$sqlUpdate="UPDATE exampledata SET col1='$p2', col2='$p3' WHERE id='$p1';";

			$sql = ($p1==0)? $sqlInsert : $sqlUpdate;
	
			$stmt = $this->dbh->prepare($sql);

			$saveData = $stmt->execute();
			
			if ( $saveData ) {
				$saved+=1;		
			}
		}
		if ($saved!=0)	{	$this->sendResponse(true,"$saved registros salvados");}
		else			{	$this->sendResponse(false,"Existe un error en el servidor");}
	}

	function Table_Delete(){

		$id = $_GET["id"];
		$sqlDelete = "delete from exampledata where id=$id;";
		$stmt = $this->dbh->prepare($sqlDelete);
		$result = $stmt->execute();

		if ($result)	{$this->sendResponse(true,"Registro Eliminado");}
		else			{$this->sendResponse(false,"No se puede eliminar el registro");}

	}

	function sendResponse($sucess="",$msg=""){
			$reponse['success'] = $sucess;
			$reponse['msg'] = $msg;
			die( json_encode($reponse));
	} /* end of enviaRespuesta */



}

?>