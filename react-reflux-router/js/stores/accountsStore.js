var Reflux = require('reflux'),
    Q = require('q');

var Api = require('../api/accountsApi'),
    Actions = require('../actions/accountsActions');

module.exports = Reflux.createStore({
	_currentAccount: null,
  _accounts: [],
	init: function() {
		this.listenTo(Actions.selectCurrentAccount, this.onSelectCurrentAccount);
    this.listenTo(Actions.add, this.onAdd);
	},
	getCurrentAccount: function() {
		return this._currentAccount;
	},
  getAllAccounts: function() {
    if (this._accounts.length !== 0) {
      return Q(this._accounts);
    }

    var that = this;
    return Api.getAllAccounts().then(function(accounts) {
      that._accounts = accounts;
      return accounts;
    });
  },
	onSelectCurrentAccount: function(newCurrentAccount) {
		this._currentAccount = newCurrentAccount;
		this.trigger();
	},
  onAdd: function(account) {
    this._accounts.push(account);
		this.trigger();
  }
});
