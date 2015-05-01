var React = require('react'),
		Reflux = require('reflux'),
		ReactAsync = require('react-async');

var Store = require('../stores/paymentsStore');

var PaymentsWidget = React.createClass({
	mixins: [
    Reflux.listenTo(Store, 'onPaymentsUpdated'),
    ReactAsync.Mixin
  ],
	getInitialStateAsync: function(state) {
		Store.getLatestPayments().then(function(payments) {
			state(null, {
				payments: payments
			});
		});
	},
	onPaymentsUpdated: function(state) {
		this.setState({
			payments: state.latestPayments
		});
	},
	render: function() {
		return (
			<div>
				<h2>Payments Widget</h2>
				<p>Latest payments:</p>
				<ul>
					{this.state.payments.map(function(payment) {
						return (<li key={payment.id}>{payment.name}</li>);
					})}
				</ul>
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
