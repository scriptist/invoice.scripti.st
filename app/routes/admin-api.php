<?php

function APIrequest() {
	$app = \Slim\Slim::getInstance();
	$app->view(new \JsonApiView());
	$app->add(new \JsonApiMiddleware());
}

// Create Invoice
$app->post('/api/invoices','APIrequest', function() use($app) {
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
		$database->insert('invoice', $invoice);
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

// Update Invoice
$app->put('/api/invoices/:id','APIrequest', function($id) use($app) {
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

	$database->update('invoice', $invoice, ['id'=>$id]);

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

// Create Invoice Line
$app->post('/api/invoices/:invoice_id/lines','APIrequest', function($invoice_id) use($app) {
	$body = json_decode($app->request->getBody());
	$fields = ['description', 'charge', 'quantity', 'is_hours'];
	$line = [
		'invoice_id'=> $invoice_id
	];

	foreach ($fields as $field) {
		$line[$field] = $body->$field;
	}

	// Connect
	global $dbCredentials;
	$database = new medoo($dbCredentials);

	// Insert
	$line['id'] = $database->insert('line', $line);

	$error = $database->error();

	if ($error[1]) {
		$app->render(500, [
			'error' => true,
			'message' => $error[2]
		]);
	} else {
		$app->render(200, [
			'line' => $line
		]);
	}
});

// Update Invoice Line
$app->put('/api/invoices/:invoice_id/lines/:line_id','APIrequest', function($invoice_id, $line_id) use($app) {
	$body = json_decode($app->request->getBody());
	$fields = ['description', 'charge', 'quantity', 'is_hours'];
	$line = [];

	foreach ($fields as $field) {
		$line[$field] = $body->$field;
	}

	// Connect
	global $dbCredentials;
	$database = new medoo($dbCredentials);

	// Insert
	$database->update('line', $line, ['AND'=>['id'=>$line_id, 'invoice_id'=>$invoice_id]]);

	$error = $database->error();

	if ($error[1]) {
		$app->render(500, [
			'error' => true,
			'message' => $error[2]
		]);
	} else {
		$app->render(200, [
			'line' => $line
		]);
	}
});

// Delete Invoice
$app->delete('/api/invoices/:id','APIrequest', function($id) use($app) {
	// Connect
	global $dbCredentials;
	$database = new medoo($dbCredentials);

	// Insert
	$database->delete('invoice', ['id'=>$id]);

	$error = $database->error();

	if ($error[1]) {
		$app->render(500, [
			'error' => true,
			'message' => $error[2],
			'query' => $database->last_query()
		]);
	} else {
		$app->render(200, [
			'message' => 'deleted'
		]);
	}
});

// Delete Invoice Line
$app->delete('/api/invoices/:invoice_id/lines/:line_id','APIrequest', function($invoice_id, $line_id) use($app) {
	// Connect
	global $dbCredentials;
	$database = new medoo($dbCredentials);

	// Insert
	$database->delete('line', ['AND'=>['id'=>$line_id, 'invoice_id'=>$invoice_id]]);

	$error = $database->error();

	if ($error[1]) {
		$app->render(500, [
			'error' => true,
			'message' => $error[2],
			'query' => $database->last_query()
		]);
	} else {
		$app->render(200, [
			'message' => 'deleted'
		]);
	}
});

?>
