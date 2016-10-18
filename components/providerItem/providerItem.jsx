import React from 'react';

const ENTRY_POINT = "http://bitrix-module-experience.local/";

var ProviderItem = React.createClass({
    getInitialState: function () {
        return {
            selectedOption: this.props.providerId,
            name: this.props.data.name,
            id: this.props.id,
            valid: true,
            validationStarted: false
        };
    },

    handleOptionChange: function (event) {
        AppDispatcher.dispatch({
            eventName: 'change-provider',
            newItem: [this.state.selectedOption, event.target.value]
        });
    },

    validateKey: function () {
        var storage = window.Tabs.tabsList;
        var providers = storage[this.state.selectedOption].providers_list;
        var url = ENTRY_POINT + '/bitrix/tools/weather_service/weather_api.php';

        return $.ajax({
            typ: "GET",
            url: url,
            dataType: 'json',
            data: {
                action: 'validateKey',
                provider: this.state.name,
                apiKey: providers[this.state.id].api_key,
                appKey: providers[this.state.id].app_key
            },
            success: function (data) {
                this.setState({valid: (data.code == 1)});
                this.setState({validationStarted: true});
            }.bind(this)
        });
    },

    _handleApiInputBlur: function () {
        this.validateKey();
    },

    _handleAppInputBlur: function () {
        this.validateKey();
    },

    _handleApiKeyChange: function (event) {
        AppDispatcher.dispatch({
            eventName: 'change-api-key-input',
            newItem: [this.state.selectedOption, {id: this.state.id, name: this.state.name, value: event.target.value}]
        });
    },

    _handleAppKeyChange: function (event) {
        AppDispatcher.dispatch({
            eventName: 'change-app-key-input',
            newItem: [this.state.selectedOption, {id: this.state.id, name: this.state.name, value: event.target.value}]
        });
    },

    render: function () {
        var storage = window.Tabs.tabsList;
        var providers = storage[this.state.selectedOption].providers_list;

        var _this = this;
        var props = this.props.data;
        var id = this.state.id;

        var providerInfo = providersInfo.ru[this.state.name];

        var ApiLine;
        var AppLine;
        var className;

        if (this.state.validationStarted) {
            className = (this.state.valid ? "valid" : "invalid");
        }

        if (providerInfo.api) {
            ApiLine = <div className="line clearfix">
                <p className="label">Api key:</p>
                <input type="text"
                       className={className}
                       name={this.state.name + '_api_key'}
                       value={providers[id].api_key}
                       onBlur={this._handleApiInputBlur}
                       onChange={this._handleApiKeyChange}/>
            </div>;
        }

        if (providerInfo.app) {
            AppLine = <div className="line clearfix">
                <p className="label">App key:</p>
                <input type="text"
                       className={className}
                       name={this.state.name + '_app_key'}
                       value={providers[id].app_key}
                       onBlur={this._handleAppInputBlur}
                       onChange={this._handleAppKeyChange}/>
            </div>
        }

        return (
            <div className="provider">
                <div className="line clearfix">
                    <input name="weather-provider"
                           type="radio"
                           value={this.state.name}
                           checked={this.state.name === storage[this.state.selectedOption].weather_provider}
                           onChange={this.handleOptionChange}/>
                    <a className="provider-name" href={providerInfo.link} target="_blank">{providerInfo.name}</a>
                </div>
                {ApiLine}
                {AppLine}
            </div>
        );
    }
});

module.exports = ProviderItem;