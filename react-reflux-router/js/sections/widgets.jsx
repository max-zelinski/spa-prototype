var Q = require('q'),
    React = require('react'),
    Reflux = require('reflux');

var Query = require('../components/queryContainer.jsx!');

var Store = require('../stores/widgetsStore'),
    Repository = require('../widgets/repository.jsx!'),
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
      return React.createElement(Repository.getWidget(widget.type), {
        widget: widget,
        key: widget.id,
      });
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

var EmptyView = <h4>Loading</h4>;

module.exports = Query.createContainer(Widgets, EmptyView, {
  queries: {
    widgets: function() {
      return Store.getWidgets();
    }
  }
});
