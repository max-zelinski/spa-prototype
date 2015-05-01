var Q = require('q'),
    React = require('react'),
    Reflux = require('reflux'),
    ReactAsync = require('react-async');

var Store = require('../stores/widgetsStore'),
    Repository = require('../widgets/repository'),
    Actions = require('../actions/widgetsActions');

var Widgets = React.createClass({
  mixins: [
    Reflux.listenTo(Store, 'onWidgetsUpdated'),
    ReactAsync.Mixin
  ],
  getInitialStateAsync: function(state) {
    Store.getWidgets().then(function(widgets) {
      state(null, {
        widgets: widgets
      });
    });
  },
  onWidgetsUpdated: function(state) {
    this.setState({widgets: state.widgets});
  },
  onAddWidgetClick: function(e) {
    e.preventDefault();

    var widget = {
      id: this.state.widgets.length,
      type: 'simple-widget'
    };
    Actions.add(widget);
  },
  render: function() {
    var widgets = this.state.widgets;
    var widgetsEl = widgets.map(function(widget) {
      return React.createElement(Repository.getWidget(widget.type), {key: widget.id});
    });
    return (
      <div>
        <h1>Widgets</h1>
        <a href='' onClick={this.onAddWidgetClick}>Add widget</a>
        {widgetsEl}
      </div>
    );
  }
});

module.exports = React.createClass({
  render: function() {
    return (
      <ReactAsync.Preloaded preloader={<div>Loading</div>}>
        <Widgets/>
      </ReactAsync.Preloaded>
    );
  }
});
