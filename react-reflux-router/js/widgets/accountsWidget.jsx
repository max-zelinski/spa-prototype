var React = require('react'),
    Reflux = require('reflux'),
    ReactAsync = require('react-async'),
    Q = require('q');

var Store = require('../stores/accountsStore'),
    Actions = require('../actions/accountsActions');

var AccountsWidget = React.createClass({
  mixins: [
    Reflux.listenTo(Store, 'onAccountsUpdated'),
    ReactAsync.Mixin
  ],
  getInitialStateAsync: function(state) {
    Q.all([
      Store.getAllAccounts(),
      Store.getCurrentAccount()
    ]).spread(function(accounts, currentAccount) {
      state(null, {
        accounts: accounts,
        currentAccount: currentAccount
      });
    });
  },
  onAccountsUpdated: function() {
		var that = this;
    this.getInitialStateAsync(function(_, state) {
      that.setState(state);
    });
	},
  changeCurrentAccount: function(e) {
    e.preventDefault();

    var accountId = e.target.value;
    if (accountId == 'empty') {
      return;
    }

    this.state.accounts.some(function(account) {
      if (account.id == accountId) {
        Actions.changeCurrentAccount(account);
        return true;
      }
      return false;
    });
  },
  render: function() {
    var currentAccount = this.state.currentAccount;
    var currentAccountId = currentAccount !== null ? currentAccount.id : 'empty';
    return (
      <div>
        <h2>Accounts Widget</h2>

        <p>Accounts:</p>
        <ul>
          {this.state.accounts.map(function(account) {
            return <li key={account.id}>{account.name}</li>;
          })}
        </ul>

        <span>Current account:</span>
        <select onChange={this.changeCurrentAccount} value={currentAccountId}>
          <option value='empty'/>
          {this.state.accounts.map(function(account){
            return <option key={account.id} value={account.id}>{account.name}</option>;
          })}
        </select>
      </div>
    );
  }
});

module.exports = React.createClass({
  render: function() {
    return (
      <ReactAsync.Preloaded preloader={<div>Loading</div>}>
        <AccountsWidget/>
      </ReactAsync.Preloaded>
    );
  }
});
