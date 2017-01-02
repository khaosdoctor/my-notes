<?php

require_once "vendor/autoload.php";

$hello = new \App\Hello;
echo $hello->getHello()."<br/>";

$controller = new \App\Controllers\IndexController;

echo $controller->getController();