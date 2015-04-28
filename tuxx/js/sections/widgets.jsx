var React = require('tuxx/React');

var WidgetsActions = require('../actions/widgetsActions');
var WidgetsStore = require('../stores/widgetsStore');

var WidgetRepository = require('../widgets/repository');

module.exports = React.createOwnerClass({
    // workaround for https://github.com/TuxedoJS/TuxedoJS/issues/170
    registerOwnerProps: function() {},
    connectOwnerToStore: function() {
        return {
            store: WidgetsStore,
            listener: function() {
                this.setState(this.getInitialState());
            }.bind(this)
        }
    },
    getInitialState: function() {
        return {
            widgets: WidgetsStore.getWidgets()
        }
    },
    addWidget: function(e) {
        e.preventDefault();
        WidgetsActions.add({id: 0, type: 'simple-widget'});
    },
    render: function() {
        return (
            <div>
                <h1>Widgets</h1>
                <a href="" onClick={this.addWidget}>Add Widget</a>
                {this.state.widgets.map(function(widget){
                    return React.createElement(WidgetRepository.getWidget(widget.type), {
                        key: widget.id,
                        widget: widget
                    });
                })}
            </div>
        );

        return <h1>Widgets</h1>;
    }
});