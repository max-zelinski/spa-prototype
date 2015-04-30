var Q = require('q');

module.exports = {
  getWidgets: function() {
    return Q([
        { id: 0, type: 'simple-widget', settings: {} },
        { id: 1, type: 'complex-widget', settings: { property: 'test' } }
      ]).delay(1000);
  },
  addWidget: function(widget) {
    console.log('adding widget');
  }
};
