var React = require('tuxx/React');

var Data = require('./data-view.jsx!');
var Settings = require('./settings-view.jsx!');

module.exports = React.createOwnerClass({
    propTypes: {
        widget: React.PropTypes.object.isRequired
    },
    registerOwnerProps: function() {
        return {
            switchMode: this.switchMode,
            widget: this.props.widget
        }
    },
    getInitialState: function() {
        return { mode: 'data' }
    },
    switchMode: function(mode) {
        this.setState({mode: mode});
    },
    render: function() {
        var view;
        switch (this.state.mode) {
            case 'data':
                view = Data;
                break;
            case 'settings':
                view = Settings;
                break;
        }

        return (
            <div>
                <h3>Complex widget</h3>
                {React.createElement(view)}
            </div>
        )
    }
});