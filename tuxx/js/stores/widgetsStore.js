var ActionStores = require('tuxx/Stores/ActionStores');
var WidgetsActions = require('../actions/widgetsActions');

module.exports = ActionStores.createStore({
    _widgets: [],
    getWidgets: function() {
        return this._widgets;
    },
    onLoad: function(widgets) {
        this._widgets = widgets;
        this.emitChange();
    },
    onAdd: function(widget) {
        this._widgets.push(widget);
        this.emitChange();
    },
    onUpdateSettings: function(update) {
        this._widgets.some(function(widget){
            if (widget.id == update.id) {
                widget.settings = update.settings;
                return true;
            }
            return false;
        });

        this.emitChange();
    },
    register: function() {
        return {
            widgets: {
                load: this.onLoad,
                add: this.onAdd,
                updateSettings: this.onUpdateSettings
            }
        }
    }
});