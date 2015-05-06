var React = require('react'),
    Transmit = require('react-transmit');

module.exports.createContainer = function (Component, EmptyView, props) {
  var assign = React.__spread;

  var transmit = Transmit.createContainer(Component, props);

  var Container = React.createClass({
    getInitialState: function() {
      return {
        isLoading: false
      };
    },
    onLoading: function(promise) {
      this.setState({ isLoading: true });
      var that = this;
      promise.then(function() {
        that.setState({ isLoading: false });
      });
    },
    render: function() {
      var props = {
				emptyView: EmptyView,
        onQuery: this.onLoading,
        isLoading: this.state.isLoading
      };

      return React.createElement(transmit, props);
    }
  });

  return Container;
};
