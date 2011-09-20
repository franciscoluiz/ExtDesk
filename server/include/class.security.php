<?php
// http://www.phpclasses.org/package/5644-PHP-Manage-user-accounts-stored-in-a-database-with-PDO.html
// author oran - email: oranm23@gmail.com
class Settings	{
    protected $dbh;
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
			
							
	    	//die( 'Connection failed: ' . $e->getMessage());
		}
	}
}

class Registration extends Settings{
    		
	protected $Username;
	protected $Password;
	protected $Email;
    
    
    /**
     * @param $username
     * @return insert to private var
     */
    function SetUsername($username)
    {
        return $this->Username = mysql_real_escape_string($username);
    }
    /**
     * @return username
     */
    function GetUsername()
    {
        return $this->Username;
    }
    /**
     * @param $password
     * @return isnert to private password var
     */
    function SetPassword($password)
    {
	    $salt = sha1("1".$password."1");
    	$password="$salt$password$salt";
        return $this->Password = sha1(mysql_real_escape_string($password));
    }
    /**
     * @param $Email
     * @return insert to private var
     */
    function SetEmail($email)
    {
        return $this->Email = mysql_real_escape_string($email);
    }
    /**
     * @return email
     */
    function GetEmail()
    {
        return $this->Email;
    }
    /**
     * @return array of erros if any
     */
    function Validate()
    {
        $errors =  array();
        
        // username must be at list 3 charecters
        if((strlen($this->Username)) < 3 )
        {
            $errors[] = "Username must be at list 3 characters";
        }
        // end username check
        // valid mail
        
        if(false === filter_var($this->Email, FILTER_VALIDATE_EMAIL))
        {
            $errors[] = "Email not valid";
        } 
        
        if((strlen($this->Password)) < 5 )
        {
            $errors[] = "Password must be at list 5 characters";
        }
        //
        return $errors;
        
    }
    /**
     * @return return array of errors if false
     * return true if o.k
     */
    function InsertUserToSql()
    {
        $error = $this->Validate();
        if(count($error) > 0 )
        {
                return $error;    
        }
        else
        {

        $stmt = $this->dbh->prepare("INSERT INTO users (username, password, email, regdate) VALUES (:username,    
        :password, :email, :regdate)");
        
        $stmt->bindParam(':username', $this->Username);
        $stmt->bindParam(':password', $this->Password);
        $stmt->bindParam(':email', $this->Email);
        $stmt->bindParam(':regdate', time());
        $stmt->execute();
        $arr = array();
        $arr = $stmt->errorInfo();
        return $arr;
        
        }
        
    }    
    
    
}

class login extends Registration {
    /**
     * @return if falis return false if ok return session 
     */
    function CheckLogin(){
        
        $stmt = $this->dbh->prepare("SELECT username, password, wallPaper, wpStretch,extrainfo1,extrainfo2,extrainfo3,active FROM users
        WHERE username = :username AND password =  :password ");
        $stmt->bindParam(':username', $this->Username);
        $stmt->bindParam(':password', $this->Password);
        $stmt->execute();
 
        if($stmt->rowCount() > 0 )
        {    
            $result=$stmt->fetch(PDO::FETCH_ASSOC);
        	//var_dump($result);
            //$_SESSION['username'] = $this->Username;
			$_SESSION['ExtDeskSession']['username']=$result["username"];            
			$_SESSION['ExtDeskSession']['wallPaper']=$result["wallPaper"];
			$_SESSION['ExtDeskSession']['wpStretch']=$result["wpStretch"];
			$_SESSION['ExtDeskSession']['extrainfo1']=$result["extrainfo1"];
			$_SESSION['ExtDeskSession']['extrainfo2']=$result["extrainfo2"];
			$_SESSION['ExtDeskSession']['extrainfo3']=$result["extrainfo3"];
			$_SESSION['ExtDeskSession']['active']=$result["active"];
        }
        else
        {
            return false;
        }
        
    }
}

class ChangeSetting extends Registration
{
    
    /**
     * @return return true on succsess
     */
    function ChangeMail()
    {
        
        $EmailPattren = '/^([a-z0-9])(([-a-z0-9._])*([a-z0-9]))*\@([a-z0-9])' .
        '(([a-z0-9-])*([a-z0-9]))+' . '(\.([a-z0-9])([-a-z0-9_-])?([a-z0-9])+)+$/i';
    
    $IsEmailValid = preg_match($EmailPattren, $this->Email);
    if($IsEmailValid > 0)
    {
        $stmt = $this->dbh->prepare("UPDATE users 
        SET email = :email WHERE username = :username
        ");
        $stmt->bindParam(':email', $this->Email);
        $stmt->bindParam(':username', $_SESSION['ExtDeskSession']['username']);
        $stmt->execute();
        return true;
    }
    else
    {
        return false;
    }
    }
        protected  $oldpass;
        
    function SetOldPass($oldpass)
    {
        $salt = sha1("1".$oldpass."1");
		$oldpass="$salt$oldpass$salt";			
        return $this->oldpass = sha1($oldpass);
    }
    
    function ChangePass()
    {
        
        $stmt = $this->dbh->prepare("UPDATE users 
        SET password = :password  WHERE username = :username AND password = :oldpass
        ");
        $stmt->bindParam(':password', $this->Password);
        $stmt->bindParam(':oldpass', $this->oldpass);
        $stmt->bindParam(':username', $_SESSION['ExtDeskSession']['username']);
        $stmt->execute();
        
        
    }
    function SendMailForNewPass()
    {
        
        $voucher = rand() . rand() . rand();
        $stmt = $this->dbh->prepare("UPDATE users 
        SET CpassReqDate = :CpassReqDate, voucher = :voucher WHERE email = :email
        ");
        $stmt->bindParam(':CpassReqDate', time());
        $stmt->bindParam(':email', $this->Email);
        $stmt->bindParam(':voucher', $voucher);
    
        $stmt->execute();
        
        
        mail($this->Email,"new pass ","
        this is link for change pass : <a href='localhost/loginsys/sample.php/?newpassv=$voucher>link</a>'
        ");
    }
    function SetNewPass()
    {
        if(!empty($_GET['newpassv']))
        {
            $voucher = $_GET['newpassv'];
            $d = time() - 1800;
            
        $stmt = $this->dbh->prepare("SELECT CpassReqDate, email FROM users WHERE
        voucher = :voucher
        ");
        
        $stmt->bindParam(':voucher', $voucher);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        
        
            $TimeLimit = $result[0]['CpassReqDate'] - time();
            if($TimeLimit > 1800)
            {
                echo "Voucher Experid";
            }
            else
            {
                
                $stmt = $this->dbh->prepare("UPDATE users 
        SET password = :password WHERE email = :email
        ");
                $email = $result[0]['email'];
                $pass = rand() . rand();
                ;
        $salt = sha1("1".$pass."1");
		$pass="$salt$pass$salt";
		
        $stmt->bindParam(':password', sha1($pass));
        $stmt->bindParam(':email', $email);
        $stmt->execute();
        mail($email,"your new pass", "the new pass is<b>:  $pass</b>");
        
            }
        }
    
        
    }
    
   function Logout()
   {
      if (!isset($_SESSION)) session_start();	/**Fix if we have a sessión... ;)**/
      unset($_SESSION['ExtDeskSession']	);
  }  
}
?> 