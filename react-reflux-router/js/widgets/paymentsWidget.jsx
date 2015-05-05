var React = require('react'),
    Reflux = require('reflux'),
    Transmit = require('react-transmit'),
    Q = require('q');

var PaymentsStore = require('../stores/paymentsStore'),
    AccountsStore = require('../stores/accountsStore');

var PaymentsWidget = React.createClass({
  mixins: [
    Reflux.listenTo(PaymentsStore, 'onStoreUpdated'),
    Reflux.listenTo(AccountsStore, 'onStoreUpdated')
  ],
  onStoreUpdated: function(refresh) {
    this.props.refreshQuery(refresh);
  },
  render: function() {
    var currentAccountPayments;
    if (this.props.currentAccount !== null) {
      currentAccountPayments = (
        <div>
          <p>{this.props.currentAccount.name} payments:</p>
          <ul>
            {this.props.currentAccountPayments.map(function(payment) {
              return (<li key={payment.id}>{payment.description}</li>);
            })}
          </ul>
        </div>
      );
    }

    return (
      <div>
        <h2>Payments Widget</h2>
        <p>Latest payments:</p>
        <ul>
          {this.props.latestPayments.map(function(payment) {
            return (<li key={payment.id}>{payment.description}</li>);
          })}
        </ul>
        {currentAccountPayments}
      </div>
    );
  }
});

module.exports = Transmit.createContainer(PaymentsWidget, {
  // queryParams: {
  //   currentAccount: function() {
  //     return AccountsStore.getCurrentAccount();
  //   }
  // },
  queries: {
    currentAccount: function() {
      return Q(AccountsStore.getCurrentAccount());
    },
    latestPayments: function() {
      return PaymentsStore.getLatestPayments();
    },
    currentAccountPayments: function(queryParams) {
      if (queryParams.currentAccount) {
        return PaymentsStore.getPayments(queryParams.currentAccount.id);
      }
      else if (AccountsStore.getCurrentAccount()) {
        return PaymentsStore.getPayments(AccountsStore.getCurrentAccount().id);
      }
      return Q([]);
    }
  }
});
