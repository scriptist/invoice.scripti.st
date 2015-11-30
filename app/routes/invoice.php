<?php

$app->get('/invoice/:id', function ($id) use ($app) {
	global $billingInfo;
	global $dbCredentials;
	$database = new medoo($dbCredentials);
	$invoice = $database->get("invoice",
		["id", "modified", "company", "name", "address", "type", "currency"],
		["id" => $id]
	);

	if ($invoice) {
		$invoice['lines'] = $database->select("line",
			["id", "description", "charge", "quantity", "is_hours"],
			[
				"invoice_id" => $invoice['id'],
				"ORDER" => "id ASC"
			]
		);
	} else {
		$app->response->setStatus(404);
	}

	$app->render('invoice.html.twig', ['invoice'=>$invoice, 'billing'=>$billingInfo]);
})->setName('invoice');

?>
