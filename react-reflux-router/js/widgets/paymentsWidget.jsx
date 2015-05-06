var React = require('react'),
    Reflux = require('reflux'),
    Q = require('q');

var PaymentsStore = require('../stores/paymentsStore'),
    AccountsStore = require('../stores/accountsStore');

var Query = require('../components/queryContainer.jsx!');

var PaymentsWidget = React.createClass({
  mixins: [
    Reflux.listenTo(PaymentsStore, 'onStoreUpdated'),
    Reflux.listenTo(AccountsStore, 'onStoreUpdated')
  ],
  onStoreUpdated: function() {
    this.props.setQueryParams();
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
        <h2>Payments Widget {this.props.isLoading ? ' loading...' : ''}</h2>
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

var EmptyView = <h4>Loading</h4>;

module.exports = Query.createContainer(PaymentsWidget, EmptyView, {
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
