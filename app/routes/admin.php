<?php

$app->get('/admin', function () use ($app) {
	global $dbCredentials;
	$database = new medoo($dbCredentials);
	$invoices = $database->select("invoice",
		["id", "modified", "currency", "company", "name", "address", "type"],
		["ORDER" => "modified DESC"]
	);

	foreach ($invoices as $id => $invoice) {
		$invoices[$id]['lines'] = $database->select("line",
			["id", "description", "charge", "quantity", "is_hours"],
			[
				"invoice_id" => $invoice['id'],
				"ORDER" => "id ASC"
			]
		);
	}

	$app->render('admin/admin.html.twig', ['invoices'=>$invoices]);
})->setName('home');

?>
