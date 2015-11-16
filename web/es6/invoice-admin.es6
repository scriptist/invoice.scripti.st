class InvoiceAdmin {
	constructor(invoicesObj) {

		this.data = {
			invoices: [],
			selected: null
		};

		invoicesObj.forEach(function(invoiceObj) {
			var invoice = new Invoice(invoiceObj);
			this.data.invoices.push(invoice);
		}.bind(this));

		this.data.selected = this.data.invoices[0];

		Vue.filter('date', function (value) {
			var date = new Date(value);
			let pad = number => number < 10 ? "0" + number : number;
			return date.getFullYear() + '-' + pad(date.getMonth() + 1) + '-' + pad(date.getDate());
		});

		Vue.directive('autosize', {
			bind: function () {
				autosize(this.el);
			},
			update: function() {
				Vue.nextTick(function() {
					autosize.update(this.el);
				}.bind(this));
			},
			unbind: function () {
				autosize.destroy(this.el);
			}
		});

		new Vue({
			el: '#invoice-admin',
			data: this.data,
			methods: {
				deleteInvoice: this.deleteInvoice.bind(this),
				newInvoice: this.newInvoice.bind(this),
				select: this.select.bind(this)
			}
		});

		window.addEventListener("beforeunload", this.checkEdited.bind(this));
	}

	checkEdited(e) {
		var anyUnsaved = false;

		this.data.invoices.forEach(function(invoice) {
			if (!anyUnsaved && (invoice.unsaved || invoice.unsavedLines)) {
				anyUnsaved = true;
			}
		});

		if (anyUnsaved)
			e.returnValue = 'You have unsaved invoices.';
	}

	deleteInvoice(invoice) {
		if (confirm('Are you sure you would like to delete this invoice?')) {
			invoice.delete();
			var idx = this.data.invoices.indexOf(invoice);
			if (idx !== -1) {
				this.data.invoices.splice(idx, 1);
				this.data.selected = null;
			}
		}
	}

	newInvoice() {
		var invoice = new Invoice();
		this.data.invoices.unshift(invoice);
		this.data.selected = invoice;
	}

	select(invoice) {
		this.data.selected = invoice;
	}
}
