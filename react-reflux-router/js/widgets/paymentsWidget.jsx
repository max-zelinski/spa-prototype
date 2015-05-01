var React = require('react'),
    Reflux = require('reflux');

var Store = require('../stores/paymentsStore'),
    Actions = require('../actions/paymentsActions');

module.exports = React.createClass({
  mixins: [Reflux.listenTo(Store, 'onPaymentsUpdated')],
  getInitialState: function() {
    return {
      payments: Store.getLatestPayments()
    };
  },
  onPaymentsUpdated: function(state) {
    this.setState(this.getInitialState());
  },
  render: function() {
    var payments;
    if (this.state.payments.length === 0) {
      payments = <div>Loading</div>;
    }
    else {
      payments = this.state.payments.map(function(payment) {
        return (<li key={payment.id}>{payment.name}</li>);
      });
    }

    return (
      <div>
        <h2>Payments Widget</h2>
        <p>Latest payments:</p>
        <ul>
          {payments}
        </ul>
      </div>
    );
  }
});
