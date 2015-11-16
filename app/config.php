<?php

global $dbCredentials;
$dbCredentials = [
    'database_type' => 'mysql',
    'database_name' => 'invoice',
    'server'        => 'localhost',
    'username'      => 'root',
    'password'      => '',
    'charset'       => 'utf8'
];

global $billingInfo;
$billingInfo = [
	'name'    => 'Joe Schmoe',
	'address' => "123 Fake Street\nSneezeborough\nRabbitton",
	'payment' => "Bank: Sneezeborough Bank\nAccount name: Joe Schmoe\nAccount Number: 1234 5678",
	'email'   => 'joeschmoe@example.com'
];

?>
