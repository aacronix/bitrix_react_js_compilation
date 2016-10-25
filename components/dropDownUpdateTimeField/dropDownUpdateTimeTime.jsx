'use strict';

import React from 'react';

var DropDownUpdateTimeField = React.createClass({
    getInitialState: function () {
        return {
            provider: this.props.provider,
            name: this.props.name
        }
    },

    initialSelect: {
        ru: {
            20: "20 минут",
            30: "30 минут",
            60: "1 час",
            120: "2 часа",
            240: "6 часов"
        }
    },

    _handleUpdateIntervalChange: function (event) {
        AppDispatcher.dispatch({
            eventName: 'change-update-interval',
            newItem: [this.state.provider, event.target.value]
        });
    },
    
    render: function () {
        var storage = window.GlobalStorage.widgetsList;

        var activeWidget = this.state.provider;
        var information = storage[activeWidget].options.information;

        return (
            <div className="line clearfix">
                <p className="label">{this.props.name}</p>
                <select onChange={this._handleUpdateIntervalChange} value={information.update_interval}>
                    <option value='30'>30 минут</option>
                    <option value='60'>1 час</option>
                    <option value='120'>2 часа</option>
                    <option value='360'>6 часов</option>
                </select>
            </div>
        );
    }
});

module.exports = DropDownUpdateTimeField;