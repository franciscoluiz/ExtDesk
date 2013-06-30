<?php

class log{
    
    function __construct(){
        //var_dump($_SESSION);
        $server = _DB_HOST;
        $driver = _DB_DRIVER;
        $user = _DB_USER;
        $password = _DB_PASSWORD;
        $dbname = _DB_NAME;
        $dsn = "$driver:dbname=$dbname;host=$server";

        try {
            $this->dbh = new PDO($dsn, $user, $password);
        } catch (PDOException $e) {
            $result = array('success' => false, 'error' => '0', 'msg' => $e->getMessage());
            die(json_encode($result));
        }
        
    }
    
    function save($user,$event,$module="",$option="",$action=""){
        
        $sql = "INSERT INTO log (user, datetimes, eventt, modules, opt, actions)  
            VALUES ('$user', NOW(), '$event', '$module', '$option', '$action');
        ";           


        $stmt = $this->dbh->prepare($sql);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        //$d=new debug();
        if (count($result) == 0) {
            //$d->log("not saved in log");
         }{
            //$d->log("saved in log");
        }
    }
}

?>