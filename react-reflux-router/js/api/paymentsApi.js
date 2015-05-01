var Q = require('q');

module.exports = {
	_payments: [
		{id: 0, accountId: 0, name: 'payment 1'},
		{id: 1, accountId: 0, name: 'payment 2'},
		{id: 2, accountId: 0, name: 'payment 3'},
		{id: 3, accountId: 1, name: 'payment 4'},
		{id: 4, accountId: 1, name: 'payment 5'},
		{id: 5, accountId: 2, name: 'payment 6 new'}
	],
  getPayments: function(accountId) {
		var payments = this._payments.filter(function(payment) {
			return payment.accountId === accountId;
		});

    return Q(payments).delay(500);
  }
};
