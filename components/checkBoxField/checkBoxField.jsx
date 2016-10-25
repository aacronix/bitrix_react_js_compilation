'use strict';

import React from 'react';

var CheckBoxField = React.createClass({
    getInitialState: function () {
        return {
            provider: this.props.provider,
            name: this.props.name
        }
    },

    _handleChangeShowProviderInfo: function () {
        var widgetsList = window.GlobalStorage.widgetsList;

        AppDispatcher.dispatch({
            eventName: 'change-show-provider-info',
            newItem: [this.state.provider, !widgetsList[this.state.provider].options.information.show_provider_info]
        });
    },

    render: function () {
        var storage = window.GlobalStorage.widgetsList;

        var activeWidget = this.state.provider;
        var information = storage[activeWidget].options.information;

        return (
            <div className="line clearfix">
                <p className="label">{this.props.name}</p>
                <input type="checkbox" name="show_provider_info" checked={information.show_provider_info} onChange={this._handleChangeShowProviderInfo}/>
            </div>
        );
    }
});

module.exports = CheckBoxField;