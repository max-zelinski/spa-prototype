var React = require('react');
var Route = require('react-router').Route;

var Layout = require('./layout.jsx!');
var Widgets = require('./sections/widgets.jsx!');
var Payments = require('./sections/payments.jsx!');

module.exports = (
    <Route name='app' path='/' handler={Layout}>
        <Route path='widgets' handler={Widgets} />
        <Route path='payments' handler={Payments} />
    </Route>
);
