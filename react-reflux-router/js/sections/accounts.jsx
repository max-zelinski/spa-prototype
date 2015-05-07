var React = require('react'),
		Reflux = require('reflux'),
		Transmit = require('react-transmit');

var Store = require('../stores/accountsStore'),
    Actions = require('../actions/accountsActions');

var Accounts = React.createClass({
  mixins: [Reflux.listenTo(Store, 'onAccountsUpdated')],
  onAccountsUpdated: function() {
		this.props.setQueryParams();
	},
  addAccount: function(e) {
    e.preventDefault();

    var accountsLength = this.props.accounts.length;
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
          {this.props.accounts.map(function(account) {
            return <li key={account.id}>{account.name}</li>;
          })}
        </ul>
      </div>
    );
  }
});

module.exports = Transmit.createContainer(Accounts, {
  queries: {
		accounts: function() {
      return Store.getAllAccounts();
    }
  }
});
