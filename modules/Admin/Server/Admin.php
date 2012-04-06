<?php
	class Admin{
		/*
		 * Simple conection with de database
		 */
		function __construct(){
			$server =  $_SESSION["drivers"]["mysql"]["0"];
			$driver =  $_SESSION["drivers"]["mysql"]["1"];
			$user =    $_SESSION["drivers"]["mysql"]["2"];
			$password = $_SESSION["drivers"]["mysql"]["3"];
			$dbname =   $_SESSION["drivers"]["mysql"]["4"];
			$dsn  = "$driver:dbname=$dbname;host=$server";
		
			try {
		    	$this->dbh = new PDO($dsn, $user, $password);
		    
			} catch (PDOException $e) {
		    	$result=array('success'=>false,'error'=>'0','msg'=>$e->getMessage());
				die (json_encode($result));
			}
		}
		/*
		 * return the list of users
		 */
		function Users_List(){
		
			$sql="	select P_id as id, username,'' as password,email,
					extrainfo1,extrainfo2,extrainfo3,active
					from users";
					
			$stmt = $this->dbh->prepare($sql);
		    $stmt->execute();
			$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
			$data = json_encode($result);
			$result = '{"success" : true,"data":'.$data.'}';
			echo $result;

		}
		
		function Users_Save(){
		
			$post=json_decode($_GET["jsonp"]);

			foreach ($post as $key) {
				
				$id = $key->id;
				$vu = $key->username;			
				$vp = $key->password;
				$vm = $key->email;
				$vex1 = $key->extrainfo1;
				$vex2 = $key->extrainfo2;
				$vex3 = $key->extrainfo3;
				$vact = $key->active;
				if ($vact=="") $vact=0;  			
				$count_saved=0;					
				if ($post[0]->password!=""){
						$salt = sha1("1".$vp."1");
    					$password = "$salt$vp$salt";
						$vp = sha1(mysql_real_escape_string($password));						
						$pswd=" password = '$vp',";
				}else {
					$pswd="";	
				}
				
				if ($id==null){
					$query="INSERT INTO users (username,password,email,extrainfo1,extrainfo2,extrainfo3,active) VALUES ('$vu','$vp','$vm','$vex1','$vex2','$vex3',$vact);";
					
				}else{
					$query = "UPDATE users 	SET".$pswd." email = '$vm',  extrainfo1 = '$vex1', extrainfo2 ='$vex2',
					extrainfo3 = '$vex3', active = $vact WHERE P_Id=$id";
				}
				$this->query=$this->dbh->prepare($query);
				if ($this->dbh->query($query)) {
		    		$count_saved++;
		    	}				
				
			}
			if ($count_saved!=0){
				echo '{"success" : true,msg:"Saved  '.$count_saved.'."}';	
			}else{
				$lastError=(implode(",",$this->dbh->errorInfo()));	
				echo '{"success" : false,msg:"No data was saved, mysql says : <i>\''.$lastError.'\'</i>"}';
			}
		}
		
		function Users_Delete(){
			$id = $_GET["id"];			
			$sql = "DELETE FROM users WHERE P_id=$id;";
			$this->query=$this->dbh->prepare($sql);
			$this->query->execute();
			$this->resulset=$this->query->fetchAll(PDO::FETCH_ASSOC);
			$total=count($this->resulset);	
			$data=array('success'=>true,'total'=>$total,'data'=>$this->resulset);
			$x= json_encode($data);
			echo $x;			
		}

		function Modules_List(){
			$sql="	select * from modules";
			$stmt = $this->dbh->prepare($sql);
		    $stmt->execute();
			$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
			$data = json_encode($result);
			$result = '{"success" : true,"data":'.$data.'}';
			echo $result;
		}
		
		function Modules_Save(){
			$post=json_decode($_GET["jsonp"]);
			foreach ($post as $key) {
				$vid = $key->id;
				$vjs = $key->js;
				$vname = $key->name;
				$vicls = $key->iconCls;
				$vmod = $key->module;
				$vil =$key->iconLaunch;
				$count_saved=0;		
				if ($vid==null){
					$query="INSERT INTO modules (js,name,iconCls,module,iconLaunch) VALUES ('$vjs','$vname','$vicls','$vmod','$vil');";
				}else{
					$query = "UPDATE modules SET js = '$vjs',  name = '$vname', iconCls ='$vicls',	module = '$vmod', iconLaunch = '$vil' WHERE id=$vid";				
				}
				$this->query=$this->dbh->prepare($query);
				if ($this->dbh->query($query)) {
		    		$count_saved++;
		    	}			
			}
			if ($count_saved!=0){
				echo '{"success" : true,msg:"Saved  '.$count_saved.'."}';	
			}else{
				$lastError=(implode(",",$this->dbh->errorInfo()));	
				echo '{"success" : false,msg:"No data was saved, mysql says : <i>\''.$lastError.'\'</i>"}';
			}
		}
		
		function Modules_Delete(){
			$id = $_GET["id"];			
			$sql = "DELETE FROM modules WHERE id=$id;";
			$this->query=$this->dbh->prepare($sql);
			$this->query->execute();
			$this->resulset=$this->query->fetchAll(PDO::FETCH_ASSOC);
			$total=count($this->resulset);	
			$data=array('success'=>true,'total'=>$total,'data'=>$this->resulset);
			$x= json_encode($data);
			echo $x;			
		}

		function Actions_List(){
			
			$module= $_GET["module"];
			$sql="	select * from actions where module='$module'";					
			
			$stmt = $this->dbh->prepare($sql);
		    $stmt->execute();
			$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
			$data = json_encode($result);
			$result = '{"success" : true,"data":'.$data.'}';
			echo $result;
			
		}

		function Actions_Save(){
			
			$post=json_decode($_GET["jsonp"]);
			foreach ($post as $key) {
				$vid=$key->id;
				$vm=$key->module;
				$vo=$key->option;
				$va=$key->action;
				$count_saved=0;
				if ($vid==null){
					$query="INSERT INTO actions (`module`,`option`,`action`) VALUES ('$vm','$vo','$va');";
				}else{
					$query = "UPDATE actions SET module = '$vm', `option` = '$vo', `action` ='$va' WHERE id=$vid";				
				}
				$this->query=$this->dbh->prepare($query);
				if ($this->dbh->query($query)) {
		    		$count_saved++;
		    	}			
			}
			if ($count_saved!=0){
				echo '{"success" : true,msg:"Saved  '.$count_saved.'."}';	
			}else{
				$lastError=(implode(",",$this->dbh->errorInfo()));	
				echo '{"success" : false,msg:"No data was saved, mysql says : <i>\''.$lastError.'\'</i>"}';
			}
		}

		function Actions_Delete(){
			$id = $_GET["id"];			
			$sql = "DELETE FROM actions WHERE id=$id;";
			$this->query=$this->dbh->prepare($sql);
			$this->query->execute();
			$this->resulset=$this->query->fetchAll(PDO::FETCH_ASSOC);
			$total=count($this->resulset);	
			$data=array('success'=>true,'total'=>$total,'data'=>$this->resulset);
			$x= json_encode($data);
			echo $x;			
		}
		
		function Groups_List(){
			
			//module= $_GET["module"];
			$sql="	select * from groups";					
			$stmt = $this->dbh->prepare($sql);
		    $stmt->execute();
			$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
			$data = json_encode($result);
			$result = '{"success" : true,"data":'.$data.'}';
			echo $result;
		}
		
		function Groups_Save(){
			$post=json_decode($_GET["jsonp"]);
			foreach ($post as $key) {
				$vid=$key->id;
				$vg=$key->group;
				$vd=$key->description;
				$va=$key->active;
				if ($va=="") $va=0; 
				$count_saved=0;
				if ($vid==null){
					$query="INSERT INTO groups (`group`,description,active) VALUES ('$vg','$vd','$va');";
				}else{
					$query = "UPDATE groups SET `group` = '$vg', description = '$vd', active =$va WHERE id=$vid";				
				}
				$this->query=$this->dbh->prepare($query);
				if ($this->dbh->query($query)) {
		    		$count_saved++;
		    	}
			}
			if ($count_saved!=0){
				echo '{"success" : true,msg:"Saved  '.$count_saved.'."}';	
			}else{
				$lastError=(implode(",",$this->dbh->errorInfo()));	
				echo '{"success" : false,msg:"No data was saved, mysql says : <i>\''.$lastError.'\'</i>"}';
			}			
			
		}
		
		function Groups_Delete(){
			$id = $_GET["id"];			
			$sql = "DELETE FROM groups WHERE id=$id;";
			$this->query=$this->dbh->prepare($sql);
			$this->query->execute();
			$this->resulset=$this->query->fetchAll(PDO::FETCH_ASSOC);
			$total=count($this->resulset);	
			$data=array('success'=>true,'total'=>$total,'data'=>$this->resulset);
			$x= json_encode($data);
			echo $x;			
		}
		
		function ModulesinGroups_List(){
			$id= $_GET["id"];
			$sql="select $id as parent, id  as id,js,
				(select count(id) from groups_modules where idgroups=$id and idmodules=m.id) as selected
				from modules m";
			$stmt = $this->dbh->prepare($sql);
		    $stmt->execute();
			$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
			$data = json_encode($result);
			$result = '{"success" : true,"data":'.$data.'}';
			echo $result;
		}
		
		function ModulesinGroups_Save(){
			$post=json_decode($_GET["jsonp"]);
	   		$count_saved=0;
			foreach ($post as $key) {

				$adminGroup=FALSE;
					
				$vg = $key->parent;
				$vm = $key->id;
			
				if($vg!=1){
			
					$iduser = $_SESSION['ExtDeskSession']['id'];
	
					if ($key->selected){
						$query="
							INSERT INTO groups_modules( idgroups, idmodules)
							SELECT $vg,$vm
							FROM dual
							WHERE NOT EXISTS (SELECT idgroups,idmodules FROM groups_modules WHERE idgroups = $vg and idModules=$vm)
						";					
					}else{
						$query="
							Delete from groups_modules
							where idgroups=$vg and idModules=$vm
						";
					}
					$this->query=$this->dbh->prepare($query);
					if ($this->dbh->query($query)) {
			    		$count_saved++;
			    	}
			   }else{
			   		$adminGroup=TRUE;				
			   }
			}
			if ($count_saved!=0){
				echo '{"success" : true,msg:"Saved  '.$count_saved.'."}';	
			}else{
				
				if($adminGroup){
					$lastError=(implode(",",$this->dbh->errorInfo()));	
					echo '{"success" : false,msg:"The Default Group can\'t be changed."}';
					
				}else{
					$lastError=(implode(",",$this->dbh->errorInfo()));	
					echo '{"success" : false,msg:"No data was saved, mysql says : <i>\''.$lastError.'\'</i>"}';
					
				}
					
				
			}			

		}

		function ActionsinGroups_List(){
			$id = $_GET["id"];
			if (empty($_GET["module"])){
				$module ="Settings";	
			}else{
				$module =$_GET["module"];
			}
			
			$sql = "select $id as parent, id  as id,module,`option` as opt,action,
				(
					select if(count(1)>0,1,0)
					from groups_actions ga 
					where idgroups=$id and idactions=a.id
				) as selected
				from actions a
				where module='$module'
				order by id
			";					
			
			
			$stmt = $this->dbh->prepare($sql);
		    $stmt->execute();
			$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
			$data = json_encode($result);
			$result = '{"success" : true,"data":'.$data.'}';
			echo $result;
			
			
		}

		function ActionsinGroups_Save(){
			$post=json_decode($_GET["jsonp"]);
	   		$count_saved=0;
			
			$adminGroup=FALSE;
			
			foreach ($post as $key) {
				//var_dump($key);
				$vg=$key->parent;
				$vm=$key->id;

				if($vg!=1){
					if ($key->selected){
						
						$query="
							INSERT INTO groups_actions (idgroups,idactions)
							SELECT $vg,$vm
							FROM dual
							WHERE NOT EXISTS (SELECT idgroups,idactions FROM groups_actions WHERE idgroups = $vg and idactions=$vm)
						";					
					}else{
						$query="
							Delete from groups_actions
							where idgroups=$vg and idactions=$vm
						";										
					}
					$this->query=$this->dbh->prepare($query);
					if ($this->dbh->query($query)) {
			    		$count_saved++;
			    	}
		    	}else{
		    		$adminGroup=TRUE;
		    	}
			}
			if ($count_saved!=0){
				echo '{"success" : true,msg:"Saved  '.$count_saved.'."}';	
			}else{
				
				if($adminGroup){
					echo '{"success" : false,msg:"Default Group, can\'t be changed."}';
					
				}else{
					$lastError=(implode(",",$this->dbh->errorInfo()));	
					echo '{"success" : false,msg:"No data was saved, mysql says : <i>\''.$lastError.'\'</i>"}';
				}
				
				
			}			
		}

		function GroupsinUser_List(){
			$id= $_GET["id"];
			$sql="select 
				$id as user,
				id,`group`,
				(select if(count(1)>0,1,0)
					from user_groups
					where iduser=$id and idgroup=g.id
				) as selected
				from groups g
			";
			$stmt = $this->dbh->prepare($sql);
		    $stmt->execute();
			$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
			$data = json_encode($result);
			$result = '{"success" : true,"data":'.$data.'}';
			echo $result;
			
		} 
		
		function GroupsinUser_Save(){
			$post=json_decode($_GET["jsonp"]);
	   		$count_saved=0;

			$adminUser=false;
						
			foreach ($post as $key) {
				//var_dump($key);
				$vg=$key->user;
				$vm=$key->id;

				if ($vg!=1){
					if ($key->selected){
						
						$query="
							INSERT INTO user_groups (iduser,idgroup)
							SELECT $vg,$vm
							FROM dual
							WHERE NOT EXISTS (SELECT iduser,idgroup FROM user_groups WHERE iduser = $vg and idgroup=$vm)
						";
						$this->addPreferences($vg,$vm);				
					}else{
						$query="
							Delete from user_groups
							where iduser=$vg and idgroup=$vm
						";
						$this->deletePreferences($vg,$vm);
					}
					$this->query=$this->dbh->prepare($query);
					if ($this->dbh->query($query)) {
			    		$count_saved++;
			    	}
				}else{
					$adminUser=TRUE;		
					
				}
			}
			if ($count_saved!=0){
				echo '{"success" : true,msg:"Saved  '.$count_saved.'."}';	
			}else{
				if ($adminUser){
					echo '{"success" : false,msg:"Default user can\'t be chenged."}';
				}else{
					$lastError=(implode(",",$this->dbh->errorInfo()));	
					echo '{"success" : false,msg:"No data was saved, mysql says : <i>\''.$lastError.'\'</i>"}';
				}
			}			
		}
		
		function addPreferences($user,$group){
			
			$sql="	select * from groups_modules where idgroups=$group";
			$stmt = $this->dbh->prepare($sql);
		    $stmt->execute();
			$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
			$count_saved=0;
			foreach ($result as $valor ) {
				
				$vm=$valor['idModules'];
				
				if($vm==8 or $vm==9){
						$add_to_shotcut=0;
					}else{
						$add_to_shotcut=1;
				}					
				$query="
						INSERT INTO 
						user_preferences( idUser, idModule,shorcut,qLaunch) 
						SELECT $user,$vm,$add_to_shotcut,$add_to_shotcut
						FROM
						dual 
						WHERE NOT EXISTS (SELECT idUser,idModule FROM user_preferences WHERE idUser = $user and idModule=$vm) 
					";
				$this->query=$this->dbh->prepare($query);
				if ($this->dbh->query($query)) {
		    		$count_saved++;
				}	
			}
		}
		
		function deletePreferences($user,$group){
			$sql="	select * from groups_modules where idgroups=$group";
			$stmt = $this->dbh->prepare($sql);
		    $stmt->execute();
			$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
			foreach ($result as $valor ) {
				$vm=$valor['idModules'];
				$query1="Delete from user_preferences where iduser=$user and idModule=$vm;";
			}
		}
	}
?>