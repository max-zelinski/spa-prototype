var Reflux = require('reflux');

var WidgetsApi = require('../api/widgetsApi');

module.exports = Reflux.createStore({
	_widgets: [],
	getWidgets: function() {
		if (this._widgets.length !== 0) {
			return this._widgets;
		}

		var that = this;
		WidgetsApi.getWidgets().then(function(widgets) {
			that._widgets = widgets;
			that.trigger(that._widgets);
		}).catch(function(err) {
			console.log('error loading widgets: ' + err);
		});

		return [];
	}
});
