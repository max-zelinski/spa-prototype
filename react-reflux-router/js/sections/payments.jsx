var React = require('react'),
    Reflux = require('reflux'),
    Transmit = require('react-transmit'),
    _ = require('lodash');

var PaymentsStore = require('../stores/paymentsStore'),
    AccountsStore = require('../stores/accountsStore');

var Payments = React.createClass({
  mixins: [
    Reflux.listenTo(PaymentsStore, 'onStoreUpdated'),
    Reflux.listenTo(AccountsStore, 'onStoreUpdated')
  ],
  onStoreUpdated: function(refresh) {
    this.props.refreshQuery(refresh);
  },
  getAccountName: function(accountId) {
    return _.find(this.props.accounts, 'id', accountId).name;
  },
  render: function() {
    return (
      <div>
        <h1>Payments</h1>
        <table>
          <thead>
            <tr>
              <th>Account</th>
              <th>Description</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {this.props.latestPayments.map(function(payment) {
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

module.exports = Transmit.createContainer(Payments, {
  queries: {
    latestPayments: function() {
      return PaymentsStore.getLatestPayments();
    },
    accounts: function() {
      return AccountsStore.getAllAccounts();
    }
  }
});
