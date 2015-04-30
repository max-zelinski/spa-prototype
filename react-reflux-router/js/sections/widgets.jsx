var React = require('react'),
Reflux = require('reflux');

var Store = require('../stores/widgetsStore'),
		Repository = require('../widgets/repository'),
		Actions = require('../actions/widgetsActions');

module.exports = React.createClass({
	mixins: [Reflux.connect(Store, 'widgets')],
	getInitialState: function() {
		return {
			widgets: Store.getWidgets()
		};
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
				{widgets.length === 0 ? <div>loading</div> : widgetsEl}
			</div>
		);
	}
});
