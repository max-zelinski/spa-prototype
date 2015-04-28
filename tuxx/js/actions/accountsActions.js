var Actions = require('tuxx/Actions');

var accountsActions = Actions.createActionCategory({
    category: 'accounts',
    actions: ['load', 'selectCurrentAccount']
});

accountsActions.before('load', function (dispatch) {
    dispatch([
        { id: 0, name: 'account 1' },
        { id: 1, name: 'account 2' }
    ]);
});

module.exports = accountsActions;