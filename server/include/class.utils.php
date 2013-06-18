<?php

class utils {

    function loadJson($file) {

        $datastring = file_get_contents($file);
        $regexes = array(
            array("p" => "/[\w]*(\/\/).*$/m", "r" => ""), //remove comments
            array("p" => "/'/m", "r" => "\"")                //replace single-quotes with double-quotes
        );

        foreach ($regexes as $regex) {
            $datastring = preg_replace($regex['p'], $regex['r'], $datastring);
        }
        preg_match("/Desktop[ ]?=[ ]?\{([^\;]+)\\;/", $datastring, $matches);

        $res = json_decode('{' . $matches[1], true);

        return $res;
    }
    
    function makePass($pass) {

        $salt = sha1("1". $pass ."1");
        $password="$salt$pass$salt";
        $senha_codificada = sha1(($password));
        
        return $senha_codificada;
    }
    /*
     * gimmicklessgpt at gmail dot com20-May-2009 04:04
     *
     * Found in docs of php.net
     *  
     * Here's a simple recursive function to copy entire directories 
     * Note to do your own check to make sure the directory exists that you first call it on. 
     * 
     * */
    function recurse_copy($src,$dst) { 
        $dir = opendir($src); 
        @mkdir($dst); 
        while(false !== ( $file = readdir($dir)) ) { 
            if (( $file != '.' ) && ( $file != '..' )) { 
                if ( is_dir($src . '/' . $file) ) { 
                    $this->recurse_copy($src . '/' . $file,$dst . '/' . $file); 
                } 
                else { 
                    copy($src . '/' . $file,$dst . '/' . $file); 
                } 
            } 
        } 
        closedir($dir); 
    } 

    
}