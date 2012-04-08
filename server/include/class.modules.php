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
		
			
			$sql="	select u.id,u.username, m.js, m.name,m.module,m.iconCls,um.shorcut,um.qLaunch,m.iconLaunch
					from users_modules um, users u, modules m
					where um.User=username and um.idModule=m.id
					and username='$user' and m.js<>'Settings' ";
			
			$sql="
			select u.p_id, m.id, u.username,m.js,m.module,m.name,m.iconCls,up.shorcut,up.qLaunch, m.iconLaunch
			from 
			user_groups ug, 
			users u, 
			groups g, 
			groups_modules gm, 
			modules m ,
			user_preferences up
			where
			ug.idUser = u.P_Id and  
			ug.idGroup = g.id and 
			g.id = gm.idgroups and 
			m.id = gm.idModules and 
			up.iduser = u.P_Id and
			up.idmodule = m.id and
			u.username='$user' and m.js<>'Settings'
						group by js
			order by m.id 
			";
			
			
			
					
			$stmt = $this->dbh->prepare($sql);
		    $stmt->execute();
			$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
			//$debug->log(json_encode($result));
			return json_encode($result);
			
		}
		
		function checkPermision(){
			$user =$_SESSION["ExtDeskSession"]["username"];
			$id=$_SESSION["ExtDeskSession"]["id"];
			

			$module=$_GET["Module"];
			$option=$_GET["option"];
			$action=$_GET["action"];	
			
			$sql="select a.module, a.`option`, a.action,ug.idGroup,u.p_id
				from 
				groups_actions ga, 
				actions a, 
				user_groups 
				ug,modules m,
				groups g,
				users u
				where
				a.id=ga.idActions and ug.idGroup=ga.idGroups and 
				m.js=a.module and ga.idgroups=g.id and
				ug.idUser=u.p_id
				and g.active=1 
				and u.active=1
				and u.P_id=$id
				and a.module='$module'
				and a.`option`='$option'
				and a.action='$action'
				order by m.id
			";
			
					
			$stmt = $this->dbh->prepare($sql);
		    $stmt->execute();
			$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
			if (count($result)==0){
				//$d->log("false");
				return FALSE;			
				
			}else{
				//$d->log("true");
				return TRUE;
				
			}
		}

		function saveWallpaper(){
			// get the params
			$user =$_SESSION["ExtDeskSession"]["username"];			
			$wp=$_GET["p1"];
			$wp=str_replace("ico-","",$wp);			
			$stretch= ($_GET["p2"] == 'true') ? 1 : 0; 
			
			// create de sql
			$sql="UPDATE users 
				SET 
				wallPaper=:wp, 
				wpStretch=:stretch
				WHERE username=:user";
			
			$result = $this->dbh->prepare($sql);
			if ($result->execute(array(':wp' => $wp, ':stretch' => $stretch, ':user' => $user))) {
    			$res =TRUE;
			} else {
    			$res =FALSE;	
			}			
			return $res;		
		}
		
		function saveShortcuts(){			
			$id=$_SESSION["ExtDeskSession"]["id"];
			$post=json_decode($_GET["jsonp"]);
			$c=0;
			foreach ($post as $key) {
				$idmodule=$key->id;
				$shortcut=$key->shorcut;
				$sql="UPDATE user_preferences SET shorcut=$shortcut WHERE idUser='$id' and idModule='$idmodule';";
				$stmt = $this->dbh->prepare($sql);
			    $c =$stmt->execute();
			}
			if ($c==0){
				return FALSE;				
			}else{
				return TRUE;
			}
		}
		function saveQLaunchs(){
				
			$id=$_SESSION["ExtDeskSession"]["id"];
			$post=json_decode($_GET["jsonp"]);
			$c=0;
			foreach ($post as $key) {
				$idmodule=$key->id;
				$qLaunch=$key->qLaunch;
				$sql="UPDATE user_preferences SET qLaunch=$qLaunch WHERE idUser='$id' and idModule='$idmodule';";
				$stmt = $this->dbh->prepare($sql);
			    $c =$stmt->execute();
			}
			if ($c==0){
				return FALSE;				
			}else{
				return TRUE;
			}
		}
		
		function saveTheme(){
			// get the params
			$user =$_SESSION["ExtDeskSession"]["username"];			
			$theme=$_GET["theme"];
			
			// create de sql
			$sql="UPDATE users 
				SET 
				theme='$theme' 
				WHERE username='$user'";
			
			
			$result = $this->dbh->prepare($sql);
			
			$d=new debug;
			$d->log($sql);
			
			if ($result->execute()) {
    			$res =TRUE;
			} else {
    			$res =FALSE;	
			}			
			return $res;		
		}
		
		
	}
?>