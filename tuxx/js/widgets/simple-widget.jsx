var React = require('tuxx/React');

var AccountsStore = require('../stores/accountsStore');

module.exports = React.createOwnerClass({
    // workaround for https://github.com/TuxedoJS/TuxedoJS/issues/170
    registerOwnerProps: function() {},
    connectOwnerToStore: function() {
        return {
            store: AccountsStore,
            listener: function() {
                this.setState(this.getInitialState());
            }.bind(this)
        }
    },
    getInitialState: function() {
        return {
            currentAccount: AccountsStore.getCurrentAccount()
        }
    },
    render: function() {
        var currentAccountName = this.state.currentAccount != null ? this.state.currentAccount.name : '';
        return (
            <div>
                <h3>Simple widget</h3>
                <p>Current account: {currentAccountName}</p>
            </div>
        );
    }
});