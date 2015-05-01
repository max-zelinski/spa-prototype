var Reflux = require('reflux'),
    Q = require('q'),
    _ = require('lodash');

var Api = require('../api/paymentsApi'),
    AccountsActions = require('../actions/accountsActions'),
    AccountsStore = require('./accountsStore'),
    GlobalActions = require('../actions/globalActions');

module.exports = Reflux.createStore({
  _payments: [],
  init: function() {
    this.listenTo(AccountsActions.add, this.onAccountsAdded);
    this.listenTo(GlobalActions.refresh, this.onRefresh);
  },
  getLatestPayments: function() {
    var accounts = AccountsStore.getAllAccounts();
    if (accounts !== 'loading') {
      var that = this;
      var result = [];
      accounts.some(function(account) {
        var payments = that.getPayments(account.id);
        if (payments === 'loading') {
          result = 'loading';
          return true;
        }
        result.push(payments);
        result = _.flatten(result);
        return false;
      });
      return result;
    }
    return 'loading';
  },
  getCurrentAccountPayments: function() {
    var currentAccount = AccountsStore.getCurrentAccount();
    if (currentAccount === 'loading') {
      return 'loading';
    }
    if (currentAccount === null) {
      return [];
    }
    return this.getPayments(currentAccount.id);
  },
  getPayments: function(accountId) {
    if (this._payments[accountId] !== undefined) {
      return this._payments[accountId];
    }

    var that = this;
    Api.getPayments(accountId).then(function(payments) {
      that._payments[accountId] = payments;
      that.trigger();
    });
    return 'loading';
  },
  onAccountsAdded: function() {
    console.log('onAccountsAdded');
    this._latestPayments = [];
    this.getLatestPayments();
    this.trigger();
  },
  onRefresh: function() {
    this._payments = [];
    this.trigger();
  }
});
