var React = require('tuxx/React');

module.exports = React.createOwneeClass({
    nearestOwnerPropTypes: {
        switchMode: React.PropTypes.func.isRequired,
        widget: React.PropTypes.object.isRequired
    },
    settingsClick : function(e) {
        e.preventDefault();
        this.nearestOwnerProps.switchMode('settings');
    },
    render: function() {
        return (
            <div>
                <p>
                    Data
                    <br/>
                    Property: {this.nearestOwnerProps.widget.settings.property}
                </p>
                <a href='' onClick={this.settingsClick}>Settings</a>
            </div>
        );
    }
});