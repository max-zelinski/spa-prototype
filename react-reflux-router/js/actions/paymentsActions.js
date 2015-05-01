var Reflux = require('reflux'),
    Q = require('q'),
    _ = require('lodash');

var Api = require('../api/paymentsApi'),
		AccountsStore = require('../stores/accountsStore');

var Actions = Reflux.createActions({
	getLatestPayments: { asyncResult: true }
});

Actions.getLatestPayments.listen(function() {
	var that = this;
	AccountsStore.getAllAccounts().then(function(accounts) {
		return Q.all(accounts.map(function(account) {
			return Api.getPayments(account.id);
		}));
	}).then(function(payments) {
		console.log('competed');
		that.completed(_.flatten(payments));
	}).catch(function(err) {
		console.log(err);
	});
});

module.exports = Actions;
