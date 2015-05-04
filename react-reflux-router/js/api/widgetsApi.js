var Q = require('q'),
    Utils = require('../utils/utils');

module.exports = {
  _widgets: [
      { id: 0, type: 'payments-widget', settings: {} },
      { id: 1, type: 'accounts-widget', settings: {} },
      { id: 2, type: 'complex-widget', settings: { property: 'property' } },
      { id: 3, type: 'simple-widget', settings: {} }
  ],
  getWidgets: Utils.throttlePromise(function() {
    return Q(this._widgets).delay(500);
  }),
  addWidget: Utils.throttlePromise(function(widget) {
    this._widgets.push();
    return Q(true);
  })
};
