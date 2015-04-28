var React = require('tuxx/React');

var AccountsActions = require('../../actions/accountsActions');
var AccountsStore = require('../../stores/accountsStore');

module.exports = React.createOwnerClass({
    // workaround for https://github.com/TuxedoJS/TuxedoJS/issues/170
    registerOwnerProps: function() {},
    nearestOwnerPropTypes: {
        switchMode: React.PropTypes.func.isRequired,
        widget: React.PropTypes.object.isRequired
    },
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
            accounts: AccountsStore.getAccounts(),
            selectedAccount: AccountsStore.getCurrentAccount()
        }
    },
    accountsChange: function(e) {
        var accountId = e.target.value;
        if (accountId == 'empty') {
            return;
        }

        this.state.accounts.some(function(account) {
            if (account.id == accountId) {
                AccountsActions.selectCurrentAccount(account);
                return true;
            }
            return false;
        })
    },
    settingsClick : function(e) {
        e.preventDefault();
        this.nearestOwnerProps.switchMode('settings');
    },
    render: function() {
        var selectedAccountId = this.state.selectedAccount != null ? this.state.selectedAccount.id : 'empty';
        return (
            <div>
                <p>
                    Accounts:
                    <select onChange={this.accountsChange} value={selectedAccountId}>
                        <option value='empty'/>
                        {this.state.accounts.map(function(account){
                            return <option key={account.id} value={account.id}>{account.name}</option>
                        })}
                    </select>

                    <br/>
                    Settings property: {this.nearestOwnerProps.widget.settings.property}
                </p>
                <a href='' onClick={this.settingsClick}>Settings</a>
            </div>
        );
    }
});