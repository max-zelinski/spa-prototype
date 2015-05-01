var Reflux = require('reflux'),
    Q = require('q'),
    _ = require('lodash');

var Api = require('../api/paymentsApi'),
		AccountsStore = require('./accountsStore');

module.exports = Reflux.createStore({
	_latestPayments: [],
	init: function() {
		this.listenTo(AccountsStore, this.onAccountsUpdated);
	},
	getLatestPayments: function() {
    if (this._latestPayments.length !== 0) {
      return Q(this._latestPayments);
    }

    var that = this;
		var deffered = Q.defer();
		AccountsStore.getAllAccounts().then(function(accounts) {
			return Q.all(accounts.map(function(account) {
				return Api.getPayments(account.id);
			}));
		}).then(function(payments) {
      var flattenPayments = _.flatten(payments);
			deffered.resolve(flattenPayments);
      that._latestPayments = flattenPayments;
		}).catch(function(err) {
      console.log(err);
			deffered.reject(err);
		});

		return deffered.promise;
	},
	onAccountsUpdated: function() {
		this._latestPayments = [];
		this.trigger();
	}
});
