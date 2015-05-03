var memoize = require('memoize');

module.exports.throttlePromise = function(operation) {
  var memoizedfun = memoize(operation);
  return function() {
    return memoizedfun.apply(this, arguments).finally(function() {
      memoizedfun.__cache.remove();
    });
  };
};
