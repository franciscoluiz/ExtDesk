<?php

class security{
	
	function login($user,$pswd){
		
		$login = new login;
		//var_dump($login);
		$login->SetUsername($user);
		$login->SetPassword($pswd);	
		$error = $login->CheckLogin();
		//echo $error;
		if( isset($_SESSION['ExtDeskSession']['username'] ) ){
			$res["success"]=TRUE;
			$res["msg"]="user {$_SESSION['ExtDeskSession']['username']} loged in ";
						
		} else {
			$res["success"]=FALSE;
			$res["msg"]="Not login";
		}			
		return $res;
	}
	
	function logout(){
		$logout = new ChangeSetting;
		$logout->Logout();
		$res["success"]=TRUE;
		$res["msg"]='closed session';
		return $res;

	}
	
	function changePass($oldPass,$newPass){

		if ( isset ( $_SESSION['username'] ) ){
			$SetingsChange = new ChangeSetting;
			$SetingsChange->SetOldPass($oldPass);
			$SetingsChange->SetPassword($newPass); // set new pass 
			$SetingsChange->ChangePass();
			$res["success"]=TRUE;
			$res["msg"]='The password has been changed.';

		} else {
			$res["success"]=FALSE;
			$res["msg"]='You must be logged in to change the password.';
		}			
		return $res;

	}
	
	function register($user,$pswd,$email){
		
		$reg = new Registration;
		$reg->SetUsername($user);
		$reg->SetPassword($pswd);
		$reg->SetEmail($email);
		$error = $reg->InsertUserToSql(); // see notes at the class
			
		if ( (!empty($error['2']) || !empty($error['0'])) && $error[0]!='00000' ){
			
			$res["success"]=FALSE;
			$res["msg"]=implode($error,',');
		}else{
			$res["success"]=TRUE;
			$res["msg"]="The user was added successfully";
		}
		return $res;
		
		
		
	}
	
	function loged(){
		if( isset($_SESSION['ExtDeskSession']['username'] ) ){
			$res["success"]=TRUE;
			$res["msg"]="user {$_SESSION['ExtDeskSession']['username']} loged in ";
						
		} else {
			$res["success"]=FALSE;
			$res["msg"]="Not login";
		}
		return $res;
	}

	function print_user(){
		
		if ($_SESSION['ExtDeskSession']['wpStretch']==1){
			$wallpaperStretch="true";				
		}else {
			$wallpaperStretch="false";				
		}
		$user = $_SESSION['ExtDeskSession']['username'];
		$wp = $_SESSION['ExtDeskSession']['wallPaper'];
		$theme = $_SESSION['ExtDeskSession']['theme'];
		
		if(@chdir('./install')){
			$wp="installexist";
			$wallpaperStretch="true";
		}		
		
		$string='			
			"id" : "1",
			"name" :"'.$user.'",'.
			'"wallPaper": "'.$wp.'",'.
			'"theme": "'.$theme.'",'.
			'"wallpaperStretch" : '.$wallpaperStretch.',';
		
		return $string;
		
	} 	

}
?>