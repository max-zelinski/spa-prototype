var React = require('react'),
		Reflux = require('reflux');

var Store = require('../stores/accountsStore'),
    Actions = require('../actions/accountsActions');

module.exports = React.createClass({
  mixins: [Reflux.listenTo(Store, 'onAccountsUpdated')],
	getInitialState: function() {
		return {
			accounts: Store.getAllAccounts()
		};
	},
  onAccountsUpdated: function() {
		this.setState(this.getInitialState());
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
		if (this.state.accounts === null) {
			return (
				<div>
					<h1>Accounts</h1>
					<p>Loading...</p>
				</div>
			);
		}
		else {
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
  }
});
