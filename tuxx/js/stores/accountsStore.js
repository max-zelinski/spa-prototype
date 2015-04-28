var ActionStores = require('tuxx/Stores/ActionStores');
var AccountsActions = require('../actions/accountsActions');

module.exports = ActionStores.createStore({
    _accounts: [],
    _currentAccount: null,
    getAccounts: function() {
        return this._accounts;
    },
    getCurrentAccount: function() {
        return this._currentAccount;
    },
    onLoad: function(accounts) {
        this._accounts = accounts;
        this.emitChange();
    },
    onSelectCurrentAccount: function(account) {
        this._currentAccount = account;
        this.emitChange();
    },
    register: function() {
        return {
            accounts: {
                load: this.onLoad,
                selectCurrentAccount: this.onSelectCurrentAccount
            }
        }
    }
});