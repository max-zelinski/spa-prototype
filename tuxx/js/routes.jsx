var React = require('tuxx/React');
var Route = require('tuxx/Router/Route');

var Layout = require('./layout.jsx!');
var Widgets = require('./sections/widgets.jsx!');
var Payments = require('./sections/payments.jsx!');

module.exports = (
    <Route name='app' path='/' handler={Layout}>
        <Route path='widgets' handler={Widgets} />
        <Route path='payments' handler={Payments} />
    </Route>
);