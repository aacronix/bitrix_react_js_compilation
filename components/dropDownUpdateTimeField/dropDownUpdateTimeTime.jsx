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
        var langFile = window.langFile.text.update_interval_dropdown;

        var activeWidget = this.state.provider;
        var information = storage[activeWidget].options.information;

        return (
            <div className="line clearfix">
                <p className="label">{this.props.name}</p>
                <select onChange={this._handleUpdateIntervalChange} value={information.update_interval}>
                    <option value='30'>{langFile.update_interval_30_min}</option>
                    <option value='60'>{langFile.update_interval_60_min}</option>
                    <option value='120'>{langFile.update_interval_120_min}</option>
                    <option value='360'>{langFile.update_interval_360_min}</option>
                </select>
            </div>
        );
    }
});

module.exports = DropDownUpdateTimeField;