var React = require('tuxx/React'),
    LinkedStateMixin = require('tuxx/React/LinkedStateMixin');

var WidgetsActions = require('../../actions/widgetsActions');

module.exports = React.createOwneeClass({
    mixins: [LinkedStateMixin],
    nearestOwnerPropTypes: {
        switchMode: React.PropTypes.func.isRequired,
        widget: React.PropTypes.object.isRequired
    },
    componentWillMount: function() {
        //workaround for https://github.com/TuxedoJS/TuxedoJS/issues/172
        this.setState({
            property: this.nearestOwnerProps.widget.settings.property
        })
    },
    saveClick: function(e) {
        e.preventDefault();
        WidgetsActions.updateSettings({
            id: this.nearestOwnerProps.widget.id,
            settings: {
                property: this.state.property
            }
        });
    },
    goBackClick : function(e) {
        e.preventDefault();
        this.nearestOwnerProps.switchMode('data');
    },
    render: function() {
        return (
            <div>
                <p>Settings</p>
                <label>Property:</label>
                <input type='text' valueLink={this.linkState('property')}/>
                <br/>
                <a href='' onClick={this.saveClick}>Save</a>
                &nbsp;
                <a href='' onClick={this.goBackClick}>Back</a>
            </div>
        );
    }
});