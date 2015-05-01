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
    return AccountsStore.getAllAccounts().then(function(accounts) {
      return Q.all(accounts.map(function(account) {
        return Api.getPayments(account.id);
      }));
    }).then(function(payments) {
      var flattenPayments = _.flatten(payments);
      that._latestPayments = flattenPayments;
      return flattenPayments;
    });
  },
  onAccountsUpdated: function() {
    this._latestPayments = [];
    this.getLatestPayments().then(function() {
      this.trigger();
    });
  }
});
