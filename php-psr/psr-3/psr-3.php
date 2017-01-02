<?php

require_once "vendor/autoload.php";

use Monolog\Logger;
use Monolog\Handler\StreamHandler;

$log = new Logger('name');
$log->pushHandler(new StreamHandler('log/app.log', Logger::WARNING));

$log->addWarning('Foo');
$log->addError('Bar');
