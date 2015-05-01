var Reflux = require('reflux'),
    Q = require('q'),
    _ = require('lodash');

var Api = require('../api/paymentsApi'),
    AccountsActions = require('../actions/accountsActions'),
    AccountsStore = require('./accountsStore');

module.exports = Reflux.createStore({
  _latestPayments: [],
  _payments: [],
  init: function() {
    this.listenTo(AccountsActions.add, this.onAccountsAdded);
  },
  getLatestPayments: function() {
    if (this._latestPayments.length !== 0) {
      return Q(this._latestPayments);
    }

    var that = this;
    return AccountsStore.getAllAccounts().then(function(accounts) {
      return Q.all(accounts.map(function(account) {
        return that.getPayments(account.id);
      }));
    }).then(function(payments) {
      var flattenPayments = _.flatten(payments);
      that._latestPayments = flattenPayments;
      return flattenPayments;
    });
  },
  getCurrentAccountPayments: function() {
    var that = this;
    return AccountsStore.getCurrentAccount().then(function(currentAccount) {
      if (currentAccount === null) {
        return [];
      }
      return that.getPayments(currentAccount.id);
    });
  },
  getPayments: function(accountId) {
    if (this._payments[accountId] !== undefined) {
      return this._payments[accountId];
    }

    var that = this;
    return Api.getPayments(accountId).then(function(payments) {
      that._payments[accountId] = payments;
      return payments;
    });
  },
  onAccountsAdded: function() {
    this._latestPayments = [];
    this.getLatestPayments().then(function() {
      this.trigger();
    });
  }
});
