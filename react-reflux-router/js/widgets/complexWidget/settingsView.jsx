var React = require('react'),
    LensedStateMixin = require('react-lensed-state');

var Actions = require('../../actions/widgetsActions');

module.exports = React.createClass({
  mixins: [LensedStateMixin],
  propTypes: {
    widget: React.PropTypes.object.isRequired,
    switchMode: React.PropTypes.func.isRequired
  },
  getInitialState: function() {
    return {
      settings: this.props.widget.settings
    };
  },
  onSaveClick: function(e) {
    e.preventDefault();
    Actions.changeSettings({
      id: this.props.widget.id,
      settings: this.state.settings
    });
  },
  onGoBackClick: function(e) {
    e.preventDefault();
    this.props.switchMode('data');
  },
  render: function() {
      return (
        <div>
          <h3>Data</h3>
          <label>Property: </label>
          <input type='text' valueLink={this.linkState('settings.property')}/>
          <br/>
          <a href='' onClick={this.onSaveClick}>Save</a>
          &nbsp;
          <a href='' onClick={this.onGoBackClick}>Back</a>
          </div>
      );
  }
});
