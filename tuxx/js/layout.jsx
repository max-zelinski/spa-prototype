var React = require('tuxx/React');
var RouteHandler = require('tuxx/Router/RouteHandler');
var Link = require('tuxx/Router/Link');

module.exports = React.createClass({
    render: function() {
        return (
            <div>
                <div className='header'>
                    <ul>
                        <li><Link to='/widgets'>Widgets</Link></li>
                        <li><Link to='/payments'>Payments</Link></li>
                    </ul>
                </div>

                <RouteHandler/>
            </div>
        );
    }
});