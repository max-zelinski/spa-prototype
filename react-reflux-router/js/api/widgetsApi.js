var Q = require('q');

module.exports = {
  getWidgets: function() {
    return Q([
        { id: 0, type: 'payments-widget', settings: {} },
        { id: 1, type: 'accounts-widget', settings: {} }
      ]).delay(0);
  },
  addWidget: function(widget) {
    console.log('adding widget');
  }
};
