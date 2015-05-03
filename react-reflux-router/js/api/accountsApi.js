var Q = require('q'),
    Utils = require('../utils/utils');

module.exports = {
  getAllAccounts: Utils.throttlePromise(function() {
    return Q([
        { id: 0, 'name': 'account 1' },
        { id: 1, 'name': 'account 2' },
    ]).delay(1000);
  })
};
