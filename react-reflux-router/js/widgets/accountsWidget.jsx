var React = require('react'),
    Reflux = require('reflux'),
    ReactAsync = require('react-async'),
    Q = require('q');

var Store = require('../stores/accountsStore');

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
  render: function() {
    return (
      <div>
        <h2>Accounts Widget</h2>
        <p>Accounts:</p>
        <ul>
          {this.state.accounts.map(function(account) {
            return <li key={account.id}>{account.name}</li>;
          })}
        </ul>
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
