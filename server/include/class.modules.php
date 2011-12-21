<?php
  
  class modules{
  	/*
	 * Simple conection with de database
	 */
  	function __construct(){
		//var_dump($_SESSION);
		$server =  $_SESSION["drivers"]["mysql"]["0"];
		$driver =  $_SESSION["drivers"]["mysql"]["1"];
		$user =    $_SESSION["drivers"]["mysql"]["2"];
		$password= $_SESSION["drivers"]["mysql"]["3"];
		$dbname=   $_SESSION["drivers"]["mysql"]["4"];
		
		$dsn = "$driver:dbname=$dbname;host=$server";
	
		try {
	    	$this->dbh = new PDO($dsn, $user, $password);
	    
		} catch (PDOException $e) {
	    	$result=array('success'=>false,'error'=>'0','msg'=>$e->getMessage());
			die (json_encode($result));
		}
	}
	
	/*
	 *  This return modules from user of this session
	 */
	
	function getUserModules(){
		
		$debug= new debug;
		$user =$_SESSION["ExtDeskSession"]["username"];
		//$debug->log($_SESSION);
		//$debug->log($user);

		$sql="	select u.username, m.js, m.name,m.module,m.iconCls,um.shorcut,um.qLaunch,m.iconLaunch
				from users_modules um, users u, modules m
				where um.User=username and um.idModule=m.id
				and username='$user'";
				
		$stmt = $this->dbh->prepare($sql);
        $stmt->execute();
		$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
		//$debug->log(json_encode($result));
		return json_encode($result);
		
		//$this->checkPermision();

/*	}
	
	function checkPermision(){
	*/	
		$debug= new debug;
		
		echo "puf";
				
		$user =$_SESSION["ExtDeskSession"]["username"];
		$module="Settings";
		$option="Wallpaper";
		$action="Save";
		
			$sql="	Select ua.user, a.id, a.module, a.option,a.action
				  	from actions a, users_actions ua
				 	where
					a.id = ua.id_action and
					ua.user='$user' and
					a.module='$module' and
					a.option='$option' and
					a.action='$action'
					
			";
				
		$stmt = $this->dbh->prepare($sql);
        $stmt->execute();
		$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
		$debug->log(json_encode($result));
		
		//return json_encode($result);
		
		
			
		
		
		
	}
	
	
  }
  
?>