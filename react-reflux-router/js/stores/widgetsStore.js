var Reflux = require('reflux'),
    Q = require('q');

var Api = require('../api/widgetsApi'),
		Actions = require('../actions/widgetsActions'),
    GlobalActions = require('../actions/globalActions');

module.exports = Reflux.createStore({
  _widgets: [],
	init: function() {
		this.listenTo(Actions.add, this.onWidgetAdd);
    this.listenTo(Actions.changeSettings, this.onChangeSettings);
    this.listenTo(GlobalActions.refresh, this.onRefresh);
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
    var that = this;
    Api.addWidget(widget).then(function() {
      that.trigger();
    });
	},
  onChangeSettings: function(update) {
    this._widgets.forEach(function(widget){
      if (widget.id === update.id) {
        widget.settings = update.settings;
        console.log(widget.settings);
        return false;
      }
    });
    this.trigger();
  },
  onRefresh: function() {
    this._widgets = [];
    this.trigger(true);
  }
});
