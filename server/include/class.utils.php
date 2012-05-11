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
    
}