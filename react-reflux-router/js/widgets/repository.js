var SimpleWidget = require('./simple-widget.jsx!'),
    ComplexWidget = require('./complexWidget/widget.jsx!'),
    PaymentsWidget = require('./paymentsWidget.jsx!'),
    AccountsWidget = require('./accountsWidget.jsx!');

var repository = {
    'simple-widget': SimpleWidget,
    'complex-widget': ComplexWidget,
    'payments-widget': PaymentsWidget,
    'accounts-widget': AccountsWidget
};

module.exports.getWidget = function(name) {
    if (repository[name] === undefined) {
        throw new Error('widget not found');
    }
    return repository[name];
};
