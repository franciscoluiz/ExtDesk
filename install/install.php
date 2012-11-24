<?php
include_once ('sql_parse.php');

if (empty($_POST)) {
    die("{success:false,msg:'Post data don't exist.'}");
}

$lang        = null;
$server1     = null;
$bd1         = 'mysql';
$user1       = null;
$pswd1       = null;
$schema1     = null;
$admin_user  = null;
$admin_pass  = null;
$admin_email = null;

if (isset($_POST["language"]))        { $lang        = $_POST["language"]; }
if (isset($_POST["mysql_server"]))     { $server1     = $_POST["mysql_server"]; }
//if (isset($_POST["bd1"]))         { $bd1 = $_POST["bd1"]; }
if (isset($_POST["user"]))       { $user1       = $_POST["user"]; }
if (isset($_POST["password"]))       { $pswd1       = $_POST["password"]; }
if (isset($_POST["database"]))       { $schema1       = $_POST["database"]; }
if (isset($_POST["user_admin"]))  { $admin_user  = $_POST["user_admin"]; }
if (isset($_POST["password_admin"]))  { $admin_pass  = $_POST["password_admin"]; }
if (isset($_POST["email_admin"])) { $admin_email = $_POST["email_admin"]; }


include_once('../server/include/class.utils.php');
$utils = new utils;
$admin_pass = $utils->makePass($admin_pass);

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

$handle = fopen('../server/include/config.php', 'w');
foreach ($configFile as $line) {
    fwrite($handle, $line);
}

fclose($handle);
chmod('../server/include/config.php', 0666);

$sqlFile = file('install.sql');

foreach ($sqlFile as $line_num => $line) {
    switch (substr($line, 0, 15)) {
        case "'set_admin_user":
            $sqlFile[$line_num] = str_replace("set_admin_user", $admin_user, $line);
            break;
        case "'set_admin_pass":
            $sqlFile[$line_num] = str_replace("set_admin_pass", $admin_pass, $line);
            break;
        case "'set_admin_emai":
            $sqlFile[$line_num] = str_replace("set_admin_emai", $admin_email, $line);
            break;
    }
}

if (!is_writable('../server/include/')) {
    $result = array('success' => false, 'error' => '4', 'msg' => 'This folder does not have write permissions');
    die(json_encode($result));
}

$sqlFileFP = '../server/include/install_now.sql';

$handle = fopen($sqlFileFP, 'w');
foreach ($sqlFile as $line) {
    fwrite($handle, $line);
}

fclose($handle);
chmod($sqlFileFP, 0666);

$sqlfile = $sqlFileFP;
$sql_query = @fread(@fopen($sqlfile, 'r'), @filesize($sqlfile));
$sql_query = remove_remarks($sql_query);
$sql_query = split_sql_file($sql_query, ";");



function runsql($db, $sql) {

    try {
        $x = $db->exec($sql);
    } catch (PDOException $e) {
        $result = array('success' => false, 'error' => '4', 'msg' => $e->getMessage());
        die(json_encode($result));
    }
}


$dsn = "$bd1:dbname=$schema1;host=$server1";

try {
    $db = new PDO($dsn, $user1, $pswd1);
} catch (PDOException $e) {
    $result = array('success' => false, 'error' => '3', 'msg' => $e->getMessage());
    die(json_encode($result));
}

foreach ($sql_query as $value) {
    runsql($db, $value);
}

if (is_file($sqlFileFP) == TRUE)
{
    chmod($sqlFileFP, 0666);
    unlink($sqlFileFP);
} 

echo "{success:true,msg:'Installed... have a nice day'}";