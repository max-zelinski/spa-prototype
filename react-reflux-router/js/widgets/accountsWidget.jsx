var React = require('react'),
    Reflux = require('reflux'),
    Q = require('q');

var Query = require('../components/queryContainer.jsx!');

var Store = require('../stores/accountsStore'),
    Actions = require('../actions/accountsActions');

var AccountsWidget = React.createClass({
  mixins: [Reflux.listenTo(Store, 'onAccountsUpdated')],
  onAccountsUpdated: function() {
    this.props.setQueryParams();
	},
  changeCurrentAccount: function(e) {
    e.preventDefault();

    var accountId = e.target.value;
    if (accountId == 'empty') {
      return;
    }

    this.props.accounts.some(function(account) {
      if (account.id == accountId) {
        Actions.changeCurrentAccount(account);
        return true;
      }
      return false;
    });
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
    var currentAccount = this.props.currentAccount;
    var currentAccountId = currentAccount !== null ? currentAccount.id : 'empty';
    return (
      <div>
        <h2>Accounts Widget {this.props.isLoading ? ' loading...' : ''}</h2>
        <a href='' onClick={this.addAccount}>Add account</a>

        <p>Accounts:</p>
        <ul>
          {this.props.accounts.map(function(account) {
            return <li key={account.id}>{account.name}</li>;
          })}
        </ul>

        <span>Current account:</span>
        <select onChange={this.changeCurrentAccount} value={currentAccountId}>
          <option value='empty'/>
          {this.props.accounts.map(function(account){
            return <option key={account.id} value={account.id}>{account.name}</option>;
          })}
        </select>
      </div>
    );
  }
});

var EmptyView = <h4>Loading</h4>;

module.exports = Query.createContainer(AccountsWidget, EmptyView, {
  queries: {
    accounts: function() {
      return Store.getAllAccounts();
    },
    currentAccount: function() {
      return Q(Store.getCurrentAccount());
    }
  }
});
