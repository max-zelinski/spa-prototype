var React = require('react');

module.exports = React.createClass({
  propTypes: {
    widget: React.PropTypes.object.isRequired,
    switchMode: React.PropTypes.func.isRequired
  },
  onSettingsClick : function(e) {
    e.preventDefault();
    this.props.switchMode('settings');
  },
  render: function() {
      return (
        <div>
          <h3>Data</h3>
          <p>Settings property: {this.props.widget.settings.property}</p>
          <a href='' onClick={this.onSettingsClick}>Settings</a>
        </div>
      );
  }
});
