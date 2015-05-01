var Q = require('q'),
    React = require('react'),
    Reflux = require('reflux');

var Store = require('../stores/widgetsStore'),
    Repository = require('../widgets/repository'),
    Actions = require('../actions/widgetsActions');

module.exports = React.createClass({
  mixins: [Reflux.listenTo(Store, 'onWidgetsUpdated')],
  getInitialState: function() {
    return {
      widgets: Store.getWidgets()
    };
  },
  onWidgetsUpdated: function() {
    this.setState(this.getInitialState());
  },
  onRefreshClick: function(e) {
    e.preventDefault();
    this.forceUpdate();
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
    if (this.state.widgets === 'loading') {
			return (
				<div>
					<h1>Widgets</h1>
					<p>Loading...</p>
				</div>
			);
		}
    else {
      var widgets = this.state.widgets;
      var widgetsEl = widgets.map(function(widget) {
        return React.createElement(Repository.getWidget(widget.type), {key: widget.id});
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
  }
});
