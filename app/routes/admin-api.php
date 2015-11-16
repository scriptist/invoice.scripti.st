<?php

function APIrequest(){
	$app = \Slim\Slim::getInstance();
	$app->view(new \JsonApiView());
	$app->add(new \JsonApiMiddleware());
}

// Create
$app->post('/api/invoices','APIrequest', function() use($app){
	$body = json_decode($app->request->getBody());
	$fields = ['company', 'name', 'address', 'type'];
	$attempts = 0;
	$invoice = [];

	foreach ($fields as $field) {
		$invoice[$field] = $body->$field;
	}

	// Connect
	global $dbCredentials;
	$database = new medoo($dbCredentials);

	// Insert
	while ($attempts++ === 0 || ($database->error()[1] === 1062 && ($attempts < 5))) {
		$invoice['id'] = mt_rand(100000, 999999);
		$o = $database->insert('invoice', $invoice);
	}

	$error = $database->error();

	if ($error[1]) {
		$app->render(500, [
			'error' => true,
			'message' => $error[2]
		]);
	} else {
		$app->render(200, [
			'invoice' => $invoice
		]);
	}
});

?>
