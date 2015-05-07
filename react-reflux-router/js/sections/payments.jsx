var React = require('react'),
    Reflux = require('reflux'),
    _ = require('lodash'),
    Link = require('react-router').Link;

var Query = require('../components/queryContainer.jsx!');

var PaymentsStore = require('../stores/paymentsStore'),
    AccountsStore = require('../stores/accountsStore');

var Payments = React.createClass({
  mixins: [
    Reflux.listenTo(PaymentsStore, 'onStoreUpdated'),
    Reflux.listenTo(AccountsStore, 'onStoreUpdated')
  ],
  onStoreUpdated: function() {
    this.props.setQueryParams();
  },
  getAccountName: function(accountId) {
    return _.find(this.props.accounts, 'id', accountId).name;
  },
  render: function() {
    return (
      <div>
        <h1>Payments</h1>
        <ul>
          <li><Link to="/payments">all</Link></li>
          {this.props.accounts.map(function(account) {
            var paymentsUrl = '/payments/' + account.id;
            return <li key={account.id}><Link to={paymentsUrl}>{account.name}</Link></li>;
          })}
        </ul>

        <table>
          <thead>
            <tr>
              <th>Account</th>
              <th>Description</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {this.props.payments.map(function(payment) {
              return (
                <tr key={payment.id}>
                  <td>{this.getAccountName(payment.accountId)}</td>
                  <td>{payment.description}</td>
                  <td>{payment.amount}</td>
                </tr>
              );
            }, this)}
          </tbody>
        </table>
      </div>
    );
  }
});

var EmptyView = <h4>Loading</h4>;

module.exports = Query.createContainer(Payments, EmptyView, {
  queries: {
    payments: function(queryParams) {
      var accountId = queryParams.params.account;
      if (accountId === undefined) {
        return PaymentsStore.getLatestPayments();
      }
      return PaymentsStore.getPayments(accountId);
    },
    accounts: function() {
      return AccountsStore.getAllAccounts();
    }
  }
});
