var React = require('react');
var Router = require('react-router');

var Routes = require('./routes.jsx!');

Router.run(Routes, function(Handler) {
    React.render(<Handler />, document.body);
});
