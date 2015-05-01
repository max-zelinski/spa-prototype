var Reflux = require('reflux'),
    Q = require('q');

var Api = require('../api/widgetsApi'),
		Actions = require('../actions/widgetsActions');

module.exports = Reflux.createStore({
  _widgets: null,
	init: function() {
		this.listenTo(Actions.add, this.onWidgetAdd);
	},
  getWidgets: function() {
    if (this._widgets !== null) {
      return this._widgets;
    }

    var that = this;
    Api.getWidgets().then(function(widgets) {
      that._widgets = widgets;
      that.trigger();
    });
    return 'loading';
  },
	onWidgetAdd: function(widget) {
		this._widgets.push(widget);
		this.trigger();
	}
});
