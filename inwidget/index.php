<?php 

error_reporting(E_ALL & ~E_NOTICE & ~E_STRICT);
setlocale(LC_ALL, "ru_RU.UTF-8");
header('Content-type: text/html; charset=utf-8');
		
require_once 'inwidget.php';

$inWidget = new inWidget();
$inWidget->getData();

require_once 'template.php';