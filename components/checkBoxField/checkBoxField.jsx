'use strict';

import React from 'react';
import Toggle from 'react-toggle';

var CheckBoxField = React.createClass({
    getInitialState: function () {
        return {
            provider: this.props.provider,
            name: this.props.name,
            check: ((window.GlobalStorage.widgetsList[this.props.provider].options.information.show_provider_info.toString() === "true") ? true : false)
        }
    },

    _handleChangeShowProviderInfo: function (event) {
        AppDispatcher.dispatch({
            eventName: 'change-show-provider-info',
            newItem: [this.state.provider, event.target.checked]
        });

        this.setState({
            check: event.target.checked
        })
    },

    render: function () {
        return (
            <div className="line clearfix">
                <p className="label">{this.props.name}</p>
                <Toggle
                  name="show_provider_info"
                  defaultChecked={this.state.check}
                  onChange={this._handleChangeShowProviderInfo} />
            </div>
        );
    }
});

module.exports = CheckBoxField;