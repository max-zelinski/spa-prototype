var Reflux = require('reflux'),
    Q = require('q');

var WidgetsApi = require('../api/widgetsApi');

module.exports = Reflux.createStore({
  _widgets: [],
  getWidgets: function() {
    if (this._widgets.length !== 0) {
      return Q(this._widgets);
    }

    var that = this;
    return WidgetsApi.getWidgets().then(function(widgets) {
      that._widgets = widgets;
      return widgets;
    }).catch(function(err) {
      console.log(err);
    });
  }
});
