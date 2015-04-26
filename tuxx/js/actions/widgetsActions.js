var Actions = require('tuxx/Actions');

var widgetsActions = Actions.createActionCategory({
    category: 'widgets',
    actions: ['load', 'add', 'updateSettings']
});

widgetsActions.before('load', function (dispatch) {
    dispatch([
        { id: 0, type: 'simple-widget', settings: {} },
        { id: 1, type: 'complex-widget', settings: { property: 'test' } }
    ]);
});

module.exports = widgetsActions;