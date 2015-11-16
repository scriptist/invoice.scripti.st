<?php

$app->get('/admin', function () use ($app) {
	global $dbCredentials;
	$database = new medoo($dbCredentials);
	$invoices = $database->select("invoice",
		["id", "modified", "company", "name", "address", "type"],
		["ORDER" => "modified DESC"]
	);

	$app->render('admin/admin.html.twig', ['invoices'=>$invoices]);
})->setName('home');

?>
