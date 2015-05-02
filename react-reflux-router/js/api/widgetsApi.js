var Q = require('q');

module.exports = {
  _widgets: [
      { id: 0, type: 'payments-widget', settings: {} },
      { id: 1, type: 'accounts-widget', settings: {} }
  ],
  getWidgets: function() {
    return Q(this._widgets).delay(500);
  },
  addWidget: function(widget) {
    this._widgets.push();
    return Q(true);
  }
};
