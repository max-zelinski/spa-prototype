var Reflux = require('reflux'),
    Q = require('q');

var Api = require('../api/widgetsApi'),
		Actions = require('../actions/widgetsActions');

module.exports = Reflux.createStore({
  _widgets: [],
	init: function() {
		this.listenTo(Actions.add, this.onWidgetAdd);
	},
  getWidgets: function() {
    if (this._widgets.length !== 0) {
      return Q(this._widgets);
    }

    var that = this;
    return Api.getWidgets().then(function(widgets) {
      that._widgets = widgets;
      return widgets;
    });
  },
	onWidgetAdd: function(widget) {
		this._widgets.push(widget);
		this.trigger();
	}
});
