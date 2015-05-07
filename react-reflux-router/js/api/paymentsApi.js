var Q = require('q'),
    Utils = require('../utils/utils');

module.exports = {
	_payments: [
		{id: 0, accountId: 0, description: 'payment 1', amount: 0.11},
		{id: 1, accountId: 0, description: 'payment 2', amount: 4.3},
		{id: 2, accountId: 0, description: 'payment 3', amount: 2.67},
		{id: 3, accountId: 1, description: 'payment 4', amount: 76.26},
		{id: 4, accountId: 1, description: 'payment 5', amount: 54.0},
		{id: 5, accountId: 2, description: 'payment 6', amount: 12.6}
	],
  getPayments: Utils.throttlePromise(function(accountId) {
		var payments = this._payments.filter(function(payment) {
			return payment.accountId == accountId;
		});

    return Q(payments).delay(500);
  })
};
