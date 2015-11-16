class Invoice {
	constructor(data = {}) {
		this._company = data.company || '';
		this._name    = data.name    || '';
		this._address = data.address || '';
		this._type    = data.type    || '';

		this.unsaved   = false;
	}

	save() {
		// TODO: Save to server
		this.unsaved = false;
	}

	// Getters and setters
	set company(v) {
		if (v === this._company)
			return;

		this.unsaved = true;
		this._company = v;
	}

	get company() {
		return this._company;
	}

	set name(v) {
		if (v === this._name)
			return;

		this.unsaved = true;
		this._name = v;
	}

	get name() {
		return this._name;
	}

	set address(v) {
		if (v === this._address)
			return;

		this.unsaved = true;
		this._address = v;
	}

	get address() {
		return this._address;
	}

	set type(v) {
		if (v === this._type)
			return;

		this.unsaved = true;
		this._type = v;
	}

	get type() {
		return this._type;
	}
}
