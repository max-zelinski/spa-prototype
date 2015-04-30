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
    console.log('getInitialStateAsync');
    Store.getWidgets().then(function(widgets) {
      console.log('getWidgets');
      state(null, {
        widgets: widgets
      });
    });
  },
  onWidgetsUpdated: function(widgets) {
    console.log('updated');
    this.setState({widgets: widgets});
  },
  render: function() {
    console.log('render');
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
