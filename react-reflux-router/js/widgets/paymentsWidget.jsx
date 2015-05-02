var React = require('react'),
    Reflux = require('reflux'),
    ReactAsync = require('react-async'),
    Q = require('q');

var PaymentsStore = require('../stores/paymentsStore'),
    AccountsStore = require('../stores/accountsStore');

var PaymentsWidget = React.createClass({
  mixins: [
    Reflux.listenTo(PaymentsStore, 'onStoreUpdated'),
    Reflux.listenTo(AccountsStore, 'onStoreUpdated'),
    ReactAsync.Mixin
  ],
  getInitialStateAsync: function(state) {
    Q.all([
      AccountsStore.getCurrentAccount(),
      PaymentsStore.getLatestPayments(),
      PaymentsStore.getCurrentAccountPayments()
    ]).spread(function(currentAccount, latestPayments, currentAccountPayments) {
      state(null, {
        currentAccount: currentAccount,
        latestPayments: latestPayments,
        currentAccountPayments: currentAccountPayments
      });
    });
  },
  onStoreUpdated: function(state) {
    var that = this;
    this.getInitialStateAsync(function(_, state) {
      that.setState(state);
    });
  },
  render: function() {
    var currentAccountPayments;
    if (this.state.currentAccount !== null) {
      currentAccountPayments = (
        <div>
          <p>Current account: {this.state.currentAccount.name}</p>
          <ul>
            {this.state.currentAccountPayments.map(function(payment) {
              return (<li key={payment.id}>{payment.name}</li>);
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
          {this.state.latestPayments.map(function(payment) {
            return (<li key={payment.id}>{payment.name}</li>);
          })}
        </ul>
        {currentAccountPayments}
      </div>
    );
  }
});

module.exports = React.createClass({
  render: function() {
    return (
      <ReactAsync.Preloaded preloader={<div>Loading</div>}>
        <PaymentsWidget/>
      </ReactAsync.Preloaded>
    );
  }
});
