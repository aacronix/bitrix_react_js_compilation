'use strict';

import React from 'react';

var CheckBoxField = React.createClass({
    getInitialState: function () {
        return {
            provider: this.props.provider,
            name: this.props.name,
            check: false
        }
    },

    _handleChangeShowProviderInfo: function () {
        var widgetsList = window.GlobalStorage.widgetsList;

        AppDispatcher.dispatch({
            eventName: 'change-show-provider-info',
            newItem: [this.state.provider, !this.state.check]
        });

        this.setState({
            check: !this.state.check
        })
    },

    componentDidMount: function () {
        var storage = window.GlobalStorage.widgetsList;

        var activeWidget = this.state.provider;
        var information = storage[activeWidget].options.information;

        this.setState({
            check: ((information.show_provider_info.toString() === "true") ? true : false)
        });
    },

    render: function () {
        var storage = window.GlobalStorage.widgetsList;

        var activeWidget = this.state.provider;
        var information = storage[activeWidget].options.information;

        console.log('cc ' + this.state.check);
        return (
            <div className="line clearfix">
                <p className="label">{this.props.name}</p>
                <input type="checkbox" name="show_provider_info" checked={this.state.check} onChange={this._handleChangeShowProviderInfo}/>
            </div>
        );
    }
});

module.exports = CheckBoxField;