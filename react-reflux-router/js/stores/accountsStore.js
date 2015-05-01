var Reflux = require('reflux'),
    Q = require('q');

var Api = require('../api/accountsApi'),
    Actions = require('../actions/accountsActions');

module.exports = Reflux.createStore({
	_currentAccount: null,
  _accounts: null,
	init: function() {
		this.listenTo(Actions.changeCurrentAccount, this.onChangeCurrentAccount);
    this.listenTo(Actions.add, this.onAdd);
	},
	getCurrentAccount: function() {
		return this._currentAccount;
	},
  getAllAccounts: function() {
    if (this._accounts !== null) {
      return this._accounts;
    }

    var that = this;
    Api.getAllAccounts().then(function(accounts) {
      that._accounts = accounts;
      that.trigger();
    });
    return 'loading';
  },
	onChangeCurrentAccount: function(newCurrentAccount) {
		this._currentAccount = newCurrentAccount;
		this.trigger();
	},
  onAdd: function(account) {
    this._accounts.push(account);
		this.trigger();
  }
});
