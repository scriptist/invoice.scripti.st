class Invoice {
	constructor(data = {}) {
		this.id            = data.id      || null;

		this._data         = {};
		this._data.company = data.company || '';
		this._data.name    = data.name    || '';
		this._data.address = data.address || '';
		this._data.type    = data.type    || '';

		this.unsaved       = false;
	}

	toObject() {
		return this._data;
	}

	toJSON() {
		return JSON.stringify(this.toObject());
	}

	save() {
		if (this.id) {

		} else {
			nanoajax.ajax({
				url: '/api/invoices',
				method: 'POST',
				body: this.toJSON()
			}, function (code, responseText, request) {
				var response = JSON.parse(responseText);
				console.log(response);
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
	set company(v) {
		if (v === this._data.company)
			return;

		this.unsaved = true;
		this._data.company = v;
	}

	get company() {
		return this._data.company;
	}

	set name(v) {
		if (v === this._data.name)
			return;

		this.unsaved = true;
		this._data.name = v;
	}

	get name() {
		return this._data.name;
	}

	set address(v) {
		if (v === this._data.address)
			return;

		this.unsaved = true;
		this._data.address = v;
	}

	get address() {
		return this._data.address;
	}

	set type(v) {
		if (v === this._data.type)
			return;

		this.unsaved = true;
		this._data.type = v;
	}

	get type() {
		return this._data.type;
	}
}
