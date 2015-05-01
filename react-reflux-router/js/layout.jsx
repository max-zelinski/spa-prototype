var React = require('react');
var RouteHandler = require('react-router').RouteHandler;
var Link = require('react-router').Link;

module.exports = React.createClass({
    render: function() {
        return (
            <div>
                <div className='header'>
                    <ul>
                        <li><Link to='/widgets'>Widgets</Link></li>
                        <li><Link to='/payments'>Payments</Link></li>
                        <li><Link to='/accounts'>Accounts</Link></li>
                    </ul>
                </div>

                <RouteHandler/>
            </div>
        );
    }
});
