var Reflux = require('reflux'),
    Q = require('q'),
    _ = require('lodash');

var Api = require('../api/paymentsApi'),
    AccountsActions = require('../actions/accountsActions'),
    GlobalActions = require('../actions/globalActions'),
    AccountsStore = require('./accountsStore');

module.exports = Reflux.createStore({
  _payments: [],
  init: function() {
    this.listenTo(AccountsActions.add, this.onAccountsAdded);
    this.listenTo(GlobalActions.refresh, this.onRefresh);
  },
  getLatestPayments: function() {
    var that = this;
    return AccountsStore.getAllAccounts().then(function(accounts) {
      return Q.all(accounts.map(function(account) {
        return that.getPayments(account.id);
      }));
    }).then(function(payments) {
      return _.flatten(payments);
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
      return Q(this._payments[accountId]);
    }
    var that = this;
    return Api.getPayments(accountId).then(function(payments) {
      that._payments[accountId] = payments;
      return payments;
    });
  },
  onAccountsAdded: function(account) {
    this.trigger(true);
  },
  onRefresh: function() {
    this._payments = [];
    this.trigger(true);
  }
});
