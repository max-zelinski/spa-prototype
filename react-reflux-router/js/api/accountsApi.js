var Q = require('q');

module.exports = {
  getAllAccounts: function() {
    return Q([
        { id: 0, 'name': 'account 1' },
				{ id: 1, 'name': 'account 2' },
      ]).delay(500);
  }
};
