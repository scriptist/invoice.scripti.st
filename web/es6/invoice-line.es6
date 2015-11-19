class InvoiceLine {
	constructor(invoiceId, data = {}) {
		this._data       = {};
		this.invoiceId   = invoiceId;
		this.id          = data.id           || null;
		this.modified    = data.modified     || new Date();

		this.description = data.description  || '';
		this.charge      = data.charge       || 0;
		this.quantity    = data.quantity     || 0;
		this.is_hours    = data.is_hours     || true;

		this.unsaved     = false;
	}

	toObject() {
		return this._data;
	}

	toJSON() {
		return JSON.stringify(this.toObject());
	}

	save() {
		if (this.id) {
			// Update
			nanoajax.ajax({
				url: '/api/invoices/' + this.invoiceId + '/lines/' + this.id,
				method: 'PUT',
				body: this.toJSON()
			}, function (code, responseText, request) {
				var response = JSON.parse(responseText);
			    if (response.error) {
			    	alert(response.message);
			    } else {
					this.unsaved = false;
			    }
			}.bind(this));
		} else {
			// Create
			nanoajax.ajax({
				url: '/api/invoices/' + this.invoiceId + '/lines',
				method: 'POST',
				body: this.toJSON()
			}, function (code, responseText, request) {
				var response = JSON.parse(responseText);
			    if (response.error) {
			    	alert(response.message);
			    } else {
					this.unsaved = false;
					this.id = response.line.id;
			    }
			}.bind(this));
		}
	}

	delete() {
		nanoajax.ajax({
			url: '/api/invoices/' + this.invoiceId + '/lines/' + this.id,
			method: 'DELETE'
		}, function (code, responseText, request) {
			var response = JSON.parse(responseText);
		    if (response.error) {
		    	alert(response.message);
		    } else {
				this.deleted = true;
		    }
		}.bind(this));
	}

	// Getters and setters
	set description(v) {
		if (v === this._data.description)
			return;

		this.unsaved = true;
		this._data.description = v;
	}

	get description() {
		return this._data.description;
	}

	set charge(v) {
		var matches;
		if (matches = /^[^0-9](-?[0-9]*(\.[0-9]*)?)$/.exec(v)) {
			v = parseFloat(matches[1]);
		}

		if (v === this._data.charge)
			return;

		this.unsaved = true;
		this._data.charge = v;
	}

	get charge() {
		return this._data.charge;
	}

	set quantity(v) {
		if (v === this._data.quantity)
			return;

		this.unsaved = true;
		this._data.quantity = v;
	}

	get quantity() {
		return this._data.quantity;
	}

	set is_hours(v) {
		// Cast to boolean
		if (typeof v !== 'boolean') {
			v = v != 0;
		}

		if (v === this._data.is_hours)
			return;

		this.unsaved = true;
		this._data.is_hours = v;
	}

	get is_hours() {
		return this._data.is_hours;
	}

	get total() {
		return this._data.charge * this._data.quantity;
	}
}
