var Reflux = require('reflux'),
    Q = require('q');

var Api = require('../api/accountsApi'),
    Actions = require('../actions/accountsActions');

module.exports = Reflux.createStore({
	_state: {
		currentAccount: null,
    accounts: []
	},
	init: function() {
		this.listenTo(Actions.selectCurrentAccount, this.onSelectCurrentAccount);
    this.listenTo(Actions.add, this.onAdd);
	},
	getCurrentAccount: function() {
		return this._state.currentAccount;
	},
  getAllAccounts: function() {
    if (this._state.accounts.length !== 0) {
      return Q(this._state.accounts);
    }

    var that = this;
    return Api.getAllAccounts().then(function(accounts) {
      that._state.accounts = accounts;
      return accounts;
    });
  },
	onSelectCurrentAccount: function(newCurrentAccount) {
		this._state.currentAccount = newCurrentAccount;
		this.trigger(this._state);
	},
  onAdd: function(account) {
    this._state.accounts.push(account);
		this.trigger(this._state);
  }
});
