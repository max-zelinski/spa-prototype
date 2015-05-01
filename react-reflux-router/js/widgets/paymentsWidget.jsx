var React = require('react'),
    Reflux = require('reflux'),
    Q = require('q');

var PaymentsStore = require('../stores/paymentsStore'),
    AccountsStore = require('../stores/accountsStore');

module.exports = React.createClass({
  mixins: [
    Reflux.listenTo(PaymentsStore, 'onStoreUpdated'),
    Reflux.listenTo(AccountsStore, 'onStoreUpdated')
  ],
  getInitialState: function() {
    return {
      currentAccount: AccountsStore.getCurrentAccount(),
      latestPayments: PaymentsStore.getLatestPayments(),
      currentAccountPayments: PaymentsStore.getCurrentAccountPayments()
    };
  },
  onStoreUpdated: function() {
    this.setState(this.getInitialState());
  },
  render: function() {
    if (this.state.currentAccount === 'loading' ||
        this.state.latestPayments === 'loading' ||
        this.state.currentAccountPayments === 'loading') {
      return (
				<div>
					<h1>Payments Widget</h1>
					<p>Loading...</p>
				</div>
			);
		}
    else {
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
  }
});
