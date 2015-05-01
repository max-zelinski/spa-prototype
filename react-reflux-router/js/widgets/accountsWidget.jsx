var React = require('react'),
    Reflux = require('reflux'),
    ReactAsync = require('react-async'),
    Q = require('q');

var Store = require('../stores/accountsStore'),
    Actions = require('../actions/accountsActions');

module.exports = React.createClass({
  mixins: [Reflux.listenTo(Store, 'onAccountsUpdated')],
  getInitialState: function() {
    return {
      accounts: Store.getAllAccounts(),
      currentAccount: Store.getCurrentAccount()
    };
  },
  onAccountsUpdated: function() {
    this.setState(this.getInitialState());
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
    if (this.state.accounts === 'loading' ||
        this.state.currentAccount === 'loading') {
			return (
				<div>
					<h1>Payments Widget</h1>
					<p>Loading...</p>
				</div>
			);
		}
    else {
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
  }
});
