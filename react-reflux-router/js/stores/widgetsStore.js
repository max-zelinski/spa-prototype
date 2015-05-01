var Reflux = require('reflux'),
    Q = require('q');

var Api = require('../api/widgetsApi'),
		Actions = require('../actions/widgetsActions'),
    GlobalActions = require('../actions/globalActions');

module.exports = Reflux.createStore({
  _widgets: null,
	init: function() {
		this.listenTo(Actions.add, this.onWidgetAdd);
    this.listenTo(GlobalActions.refresh, this.onRefresh);
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
	},
  onRefresh: function() {
    this._widgets = null;
    this.trigger();
  }
});
