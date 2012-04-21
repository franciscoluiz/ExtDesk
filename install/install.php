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
	echo $dsn;
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
 
 
?>