var memoize = require('memoize');

module.exports.throttlePromise = function(operation) {
  var memoizedfun = memoize(operation);
  return function() {
    var args = arguments;
    return memoizedfun.apply(this, args).finally(function() {
      memoizedfun.__cache.remove.apply(null, args);
    });
  };
};
