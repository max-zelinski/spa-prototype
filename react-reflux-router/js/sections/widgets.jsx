var Q = require('q'),
    React = require('react'),
    Reflux = require('reflux'),
    Transmit = require('react-transmit');

var Store = require('../stores/widgetsStore'),
    Repository = require('../widgets/repository'),
    Actions = require('../actions/widgetsActions'),
    GlobalActions = require('../actions/globalActions');

var Widgets = React.createClass({
  mixins: [Reflux.listenTo(Store, 'onWidgetsUpdated')],
  onWidgetsUpdated: function() {
    this.props.setQueryParams();
  },
  onRefreshClick: function(e) {
    e.preventDefault();

    GlobalActions.refresh();
  },
  onAddWidgetClick: function(e) {
    e.preventDefault();

    var widget = {
      id: this.props.widgets.length,
      type: 'accounts-widget'
    };
    Actions.add(widget);
  },
  render: function() {
    var widgets = this.props.widgets;
    var widgetsEl = widgets.map(function(widget) {
      return React.createElement(Repository.getWidget(widget.type), {key: widget.id, emptyView: <h4>Loading...</h4>});
    });
    return (
      <div>
        <h1>Widgets</h1>
        <a href='' onClick={this.onRefreshClick}>Refresh</a>
        <br/>
        <a href='' onClick={this.onAddWidgetClick}>Add widget</a>
        {widgetsEl}
      </div>
    );
  }
});

module.exports = Transmit.createContainer(Widgets, {
  queries: {
    widgets: function() {
      return Store.getWidgets();
    }
  }
});
