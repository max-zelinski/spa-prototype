var React = require('react');

var DataView = require('./dataView.jsx!'),
		SettingsView = require('./settingsView.jsx!');

module.exports = React.createClass({
	propTypes: {
    widget: React.PropTypes.object.isRequired
  },
	getInitialState: function() {
    return { mode: 'data' };
  },
	switchMode: function(mode) {
    this.setState({ mode: mode });
  },
	getView: function() {
		switch (this.state.mode) {
			case 'data':
				return DataView;
			case 'settings':
				return SettingsView;
		}
	},
	render: function() {
		return (
      <div>
        <h2>Complex widget</h2>
        {React.createElement(this.getView(), {
					widget: this.props.widget,
					switchMode: this.switchMode
				})}
      </div>
    );
	}
});
