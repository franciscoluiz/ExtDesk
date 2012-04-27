<?php

session_start();
require_once('server/os.php');

if (!class_exists('os')) {
    die('os class is missing!');
}

$myOs = new os();
$myOs->start();

$myOs->process();

?>