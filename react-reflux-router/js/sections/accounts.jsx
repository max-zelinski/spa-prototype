var React = require('react'),
		Reflux = require('reflux'),
		ReactAsync = require('react-async');

var Store = require('../stores/accountsStore'),
    Actions = require('../actions/accountsActions');

var Accounts = React.createClass({
  mixins: [
    Reflux.listenTo(Store, 'onAccountsUpdated'),
    ReactAsync.Mixin
  ],
  getInitialStateAsync: function(state) {
		Store.getAllAccounts().then(function(accounts) {
			state(null, {
				accounts: accounts
			});
		});
	},
  onAccountsUpdated: function() {
		var that = this;
    this.getInitialStateAsync(function(_, state) {
      that.setState(state);
    });
	},
  addAccount: function(e) {
    e.preventDefault();

    var accountsLength = this.state.accounts.length;
    var account = {
      id: accountsLength,
      name: 'account ' + (accountsLength + 1)
    };
    Actions.add(account);
  },
  render: function() {
    return (
      <div>
        <h1>Accounts</h1>
        <a href='' onClick={this.addAccount}>Add account</a>
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
        <Accounts/>
      </ReactAsync.Preloaded>
    );
  }
});
