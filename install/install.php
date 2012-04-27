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
?>