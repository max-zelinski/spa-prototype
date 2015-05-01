var Reflux = require('reflux'),
    Q = require('q'),
    _ = require('lodash');

var Api = require('../api/paymentsApi'),
    AccountsStore = require('./accountsStore');

module.exports = Reflux.createStore({
  _state: {
    latestPayments: []
  },
  init: function() {
    this.listenTo(AccountsStore, this.onAccountsUpdated);
  },
  getLatestPayments: function() {
    if (this._state.latestPayments.length !== 0) {
      return Q(this._state.latestPayments);
    }

    var that = this;
    var deffered = Q.defer();
    AccountsStore.getAllAccounts().then(function(accounts) {
      return Q.all(accounts.map(function(account) {
        return Api.getPayments(account.id);
      }));
    }).then(function(payments) {
      var flattenPayments = _.flatten(payments);
      that._state.latestPayments = flattenPayments;
      deffered.resolve(flattenPayments);
    }).catch(deffered.reject);

    return deffered.promise;
  },
  onAccountsUpdated: function() {
    this._state.latestPayments = [];
    var that = this;
    this.getLatestPayments().then(function(payments) {
      that.trigger(that._state);
    });
  }
});
