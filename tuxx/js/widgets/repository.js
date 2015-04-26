var SimpleWidget = require('./simple-widget.jsx!'),
    ComplexWidget = require('./complex-widget/widget.jsx!');

var repository = {
    'simple-widget': SimpleWidget,
    'complex-widget': ComplexWidget
};

module.exports.getWidget = function(name) {
    if (repository[name] === undefined) {
        throw new Error('widget not found');
    }
    return repository[name];
}