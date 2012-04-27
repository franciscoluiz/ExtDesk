<<<<<<< HEAD
<?php	

	sleep(0.5);
	
	include_once ('sql_parse.php');

	if(empty($_POST)){
		die ("{success:false,msg:'Post data don't exist.'}");		
	}
	
	
	
	$flag_ini=false;
	
	$lang 	  = $_POST['language'];		
	$server1  = $_POST['mysql_server']; 
	$bd1      = 'mysql';
	$user1    = $_POST['user'];
	$pswd1    = $_POST['password'];
	$schema1  = $_POST['database'];

	$server2  = $_POST['mysql_server']; 
	$bd2      = 'mysql';
	$user2    = $_POST['user'];
	$pswd2    = $_POST['password'];
	$schema2  = $_POST['database'];


	$str  = "[ExtDesk]\n";
    $str .= "lang=\"$lang\"\n";
    $str .= "; debug config 1=true, 0=false;\n";
	$str .= "debug=0\n";
	$str .= "[drivers]\n";
	$str .= ";driver mysql;\n";
	$str .= "mysql[] = \"$server1\"\n";
	$str .= "mysql[] = \"$bd1\"\n";
	$str .= "mysql[] = \"$user1\"\n";
	$str .= "mysql[] = \"$pswd1\"\n";
	$str .= "mysql[] = \"$schema1\"\n";
	
	$str .= "/*other driver\n";
	$str .= "mysql2[] = \"$server2\"\n";
	$str .= "mysql2[] = \"$bd2\"\n";
	$str .= "mysql2[] = \"$user2\"\n";
	$str .= "mysql2[] = \"$pswd2\"\n";
	$str .= "mysql2[] = \"$schema2\"\n";
	
	$ini_file="config.ini";
	
	file_put_contents("config.ini", $str);
 
	if (!copy('config.ini','../server/include/'.$ini_file)) {
  		$result=array('success'=>false,'error'=>'0','msg'=>"Config.ini can't be copied");
		die (json_encode($result));
	}

    if (is_file('../server/include/'.$ini_file) == TRUE)
    {
      chmod($ini_file, 0666);
      unlink($ini_file);
    } 
  
  
	try {
		$mysqli = new mysqli($server1, $user1, $pswd1, "mysql");	
	}catch (mysqli_sql_exception $e) {
 	   print "Error Code <br>".$e->getCode();
    	print "Error Message <br>".$e->getMessage();
    	print "Strack Trace <br>".nl2br($e->getTraceAsString());
	}
	//if ($mysqli->connect_errno) {
    //	echo "Failed to connect to MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
	//}
	//echo $mysqli->host_info . "\n";
	
	$sqlfile   = "installsc.sql";
	$sql_query = @fread(@fopen($sqlfile, 'r'), @filesize($sqlfile));
	$sql_query = remove_remarks($sql_query);
	$sql_query = split_sql_file($sql_query, ";");
	
	
	// we firs conect with mysql default databse;
	$dsn = "$bd1:dbname=mysql;host=$server1";
	try {
		$db = new PDO($dsn, $user1, $pswd1);
		$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    	$db->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
	} catch (PDOException $e) {
    	$result=array('success'=>false,'error'=>'2','msg'=>$e->getMessage());
		die (json_encode($result));
	}
	
	function runsql($db,$count,$string,$sql){
			
		$x=$db->exec($sql);
		//echo "<p>$sql</p>";
		//echo "<p>Query $count,$string return $x </p>";
		
	}

	/*** step 1 ***/
	runsql($db,1,"Crear bd","CREATE DATABASE  IF NOT EXISTS $schema1");
	
	/*** step 2 ***/
	$dsn = "$bd1:dbname=$schema1;host=$server1";
	try {
		$db = new PDO($dsn, $user1, $pswd1);
		$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    	$db->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
		
	} catch (PDOException $e) {
    	$result=array('success'=>false,'error'=>'3','msg'=>$e->getMessage());
		die (json_encode($result));
	}

	foreach ($sql_query as $value) {
		runsql($db,1,"query",$value);
	}
 
 	echo "{success:true,msg:'installed... have a nice day'}";
 
 
=======
<?php

sleep(2);

include_once ('sql_parse.php');

if (empty($_POST)) {
    die("{success:false,msg:'Post data don't exist.'}");
}

$lang = $_POST['language'];
$server1 = $_POST['mysql_server'];
$bd1 = 'mysql';
$user1 = $_POST['user'];
$pswd1 = $_POST['password'];
$schema1 = $_POST['database'];

$configFile = file('../server/include/config_sample.php');

foreach ($configFile as $line_num => $line) {
    switch (substr($line, 0, 14)) {
        case "define('_LANGU":
            $configFile[$line_num] = str_replace("set_language", $lang, $line);
            break;
        case "define('_DEBUG":
            $configFile[$line_num] = str_replace("set_debug", '0', $line);
            break;
        case "define('_DB_HO":
            $configFile[$line_num] = str_replace("set_db_host", $server1, $line);
            break;
        case "define('_DB_DR":
            $configFile[$line_num] = str_replace("set_db_type", $bd1, $line);
            break;
        case "define('_DB_NA":
            $configFile[$line_num] = str_replace("set_db_name", $schema1, $line);
            break;
        case "define('_DB_US":
            $configFile[$line_num] = str_replace("set_db_user", $user1, $line);
            break;
        case "define('_DB_PA":
            $configFile[$line_num] = str_replace("set_db_password", $pswd1, $line);
            break;
    }
}

if (!is_writable('../server/include/')) {
    $result = array('success' => false, 'error' => '4', 'msg' => 'This folder doenst have write permissions');
    die(json_encode($result));
}

$handle = fopen('../server/include/' . 'config.php', 'w');
foreach ($configFile as $line) {
    fwrite($handle, $line);
}
fclose($handle);
chmod('../server/include/' . 'config.php', 0666);

$sqlfile = "installsc.sql";
$sql_query = @fread(@fopen($sqlfile, 'r'), @filesize($sqlfile));
$sql_query = remove_remarks($sql_query);
$sql_query = split_sql_file($sql_query, ";");

// we firs conect with mysql default databse;
$dsn = "$bd1:dbname=$schema1;host=$server1";
try {
    $db = new PDO($dsn, $user1, $pswd1);
} catch (PDOException $e) {
    $result = array('success' => false, 'error' => '2', 'msg' => $e->getMessage());
    die(json_encode($result));
}

function runsql($db, $count, $string, $sql) {

    $x = $db->exec($sql);
    //echo "<p>$sql</p>";
    //echo "<p>Query $count,$string return $x </p>";
}

/* * * step 1 ** */
runsql($db, 1, "Crear bd", "CREATE DATABASE  IF NOT EXISTS $schema1");

/* * * step 2 ** */
$dsn = "$bd1:dbname=$schema1;host=$server1";
try {
    $db = new PDO($dsn, $user1, $pswd1);
} catch (PDOException $e) {
    $result = array('success' => false, 'error' => '3', 'msg' => $e->getMessage());
    die(json_encode($result));
}

foreach ($sql_query as $value) {
    runsql($db, 1, "query", $value);
}

echo "{success:true,msg:'installed... have a nice day'}";
>>>>>>> ac977f797d793a737bdcd753429d5c955fa2737d
?>