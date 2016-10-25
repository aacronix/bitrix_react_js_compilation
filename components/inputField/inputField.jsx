'use strict';

import React from 'react';

var InputField = React.createClass({
    getInitialState: function () {
        return {
            provider: this.props.provider,
            name: this.props.name
        }
    },

    _handleWidgetNameChange: function (event) {
        AppDispatcher.dispatch({
            eventName: 'change-widget-name',
            newItem: [this.state.provider, event.target.value]
        });
    },

    render: function () {
        var storage = window.GlobalStorage.widgetsList;
        var activeWidget = this.state.provider;

        return (
            <div className="line clearfix">
                <p className="label">{this.props.name}</p>
                <input type="text" name="widget_name" value={storage[activeWidget].widget.name} onChange={this._handleWidgetNameChange}/>
            </div>
        );
    }
});

module.exports = InputField;