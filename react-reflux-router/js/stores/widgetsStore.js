var Reflux = require('reflux'),
    Q = require('q');

var Api = require('../api/widgetsApi'),
		Actions = require('../actions/widgetsActions');

module.exports = Reflux.createStore({
  _state: {
    widgets: []
  },
	init: function() {
		this.listenTo(Actions.add, this.onWidgetAdd);
	},
  getWidgets: function() {
    if (this._state.widgets.length !== 0) {
      return Q(this._state.widgets);
    }

    var that = this;
    return Api.getWidgets().then(function(widgets) {
      that._state.widgets = widgets;
      return widgets;
    }).catch(function(err) {
      console.log(err);
    });
  },
	onWidgetAdd: function(widget) {
		this._state.widgets.push(widget);
		this.trigger(this._state);
	}
});
