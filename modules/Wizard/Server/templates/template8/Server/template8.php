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

		$output["columns"][]=array("dataIndex"=>"id",		"header"=>"id",		"hidden" =>false,	"width"=>60);
		$output["columns"][]=array("dataIndex"=>"data1",	"header"=>"data1",	"hidden" =>false,	"width"=>60);		
		$output["columns"][]=array("dataIndex"=>"data2",	"header"=>"Cliente","sortable" => false,"width"=>200,	"editor"=>array("xtype"=>'textfield','allowBlank'=>false));

		$start = (($_GET['page']-1)*$_GET['limit'])-0;
		$limit = $_GET['limit'];
	
		// principal Query
		$sql = " select id,col1 as data1, col2 as data2 from exampledata where id<5 limit 0,25;
				limit $start,$limit;";

		// return the Query
		$stmt = $this->dbh->prepare($sql);
		$stmt->execute();
		$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
		
		//$d=new debug();
		//$d->log($sql);
		//$d->log($result);

       	// the total count
		$sql ="SELECT FOUND_ROWS() AS total";
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
}

?>