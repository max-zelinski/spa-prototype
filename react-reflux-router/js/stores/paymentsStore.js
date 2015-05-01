var Reflux = require('reflux'),
    Q = require('q'),
    _ = require('lodash');

var Api = require('../api/paymentsApi'),
    Actions = require('../actions/paymentsActions'),
    AccountsStore = require('./accountsStore');

module.exports = Reflux.createStore({
  _latestPayments: [],
  init: function() {
    this.listenTo(Actions.getLatestPayments.completed, this.onGetLatestPaymentsCompleted);
    this.listenTo(AccountsStore, this.onAccountsUpdated);
  },
  onGetLatestPaymentsCompleted: function(payments) {
    this._latestPayments = payments;
    this.trigger();
  },
  getLatestPayments: function() {
    if (this._latestPayments.length === 0) {
      Actions.getLatestPayments();
    }

    return this._latestPayments;
  },
  onAccountsUpdated: function() {
    Actions.getLatestPayments();
    this.trigger();
  }
});
