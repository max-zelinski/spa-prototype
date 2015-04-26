var React = require('tuxx/React');
var Router = require('react-router');

var Routes = require('./routes.jsx!');

var WidgetsActions = require('./actions/widgetsActions');
var WidgetsStore = require('./stores/widgetsStore');

WidgetsActions.load();

Router.run(Routes, function(Handler) {
    React.render(<Handler />, document.body);
});