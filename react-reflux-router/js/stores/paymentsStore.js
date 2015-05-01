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
      return this._latestPayments;
    }

    var that = this;
    AccountsStore.getAllAccounts().then(function(accounts) {
      return Q.all(accounts.map(function(account) {
        return Api.getPayments(account.id);
      }));
    }).then(function(payments) {
      that._latestPayments = _.flatten(payments);
      that.trigger();
    });

    return [];
  },
  onAccountsUpdated: function() {
    this._latestPayments = [];
    this.getLatestPayments();
    this.trigger();
  }
});
