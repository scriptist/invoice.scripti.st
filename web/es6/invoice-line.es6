class InvoiceLine {
	constructor(invoiceId, data = {}) {
		this.invoiceId         = invoiceId;
		this.id                = data.id       || null;
		this.modified          = data.modified || new Date();


		this._data             = {};
		this._data.description = data.description  || '';
		this._data.charge      = data.charge       || 0;
		this._data.quantity    = data.quantity     || 0;
		this._data.isHours     = data.isHours      || true;

		this.unsaved           = false;
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
					this.id = response.invoice.id;
			    }
			}.bind(this));
		}
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
		if (matches = /^[^0-9]([0-9]*(\.[0-9]*)?)$/.exec(v)) {
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

	set isHours(v) {
		if (v === this._data.isHours)
			return;

		this.unsaved = true;
		this._data.isHours = v;
	}

	get isHours() {
		return this._data.isHours;
	}

	get total() {
		return this._data.charge * this._data.quantity;
	}
}
