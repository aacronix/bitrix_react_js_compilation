import React from 'react';

const ENTRY_POINT = "http://bitrix-module-experience.local/";

var ProviderItem = React.createClass({
    getInitialState: function () {
        return {
            selectedOption: this.props.providerId,
            provider: this.props.data.activeProvider
        };
    },

    validateKey: function(provider, apiKey, appKey){
        var url = ENTRY_POINT + '/bitrix/tools//weather_api.php';

        return $.ajax({
            typ: "GET",
            url: url,
            dataType: 'json',
            data: {
                action: 'validateKey',
                provider: provider,
                apiKey: apiKey,
                appKey: appKey
            },
            dataFilter: function (data) {
                console.log(data);
                // var data = JSON.parse(data);
                //
                // var response = [];
                // response = {
                //     code: data.code,
                //     widget: report.widget,
                //     provider: report.provider,
                //     apiKeyValidation: report.apiKeyValidation,
                //     appKeyValidation: report.appKeyValidation,
                //     apiKey: report.appKey,
                //     appKey: report.appKey
                // };
                //
                // return JSON.stringify(response);
            }
        });
    },

    handleOptionChange: function () {
        AppDispatcher.dispatch({
            eventName: 'change-provider',
            newItem: [this.state.selectedOption, this.state.provider]
        });
    },
    render: function () {
        var storage = window.Tabs.tabsList;

        var _this = this;
        var props = this.props.data;
        var providerInfo = providersInfo.ru[props.name];

        var ApiLine;
        var AppLine;

        if (providerInfo.api){
            ApiLine = <div className="line clearfix">
                <p className="label">Api key:</p>
                <input type="text" name={props.name + '_api_key'} value={props.api_key} onChange={function(){_this.validateKey(props.name, props.api_key, props.app_key)}}/>
            </div>;
        }

        if (providerInfo.app){
            AppLine = <div className="line clearfix">
                <p className="label">App key:</p>
                <input type="text" name={props.name + '_app_key'}  value={props.app_key}/>
            </div>
        }

        return (
            <div className="provider">
                <div className="line clearfix">
                    <input name="weather-provider" type="radio" value={props.name} checked={props.name === storage[this.state.selectedOption].weather_provider} onChange={this.handleOptionChange}/>
                    <a className="provider-name" href={providerInfo.link} target="_blank">{providerInfo.name}</a>
                </div>
                {ApiLine}
                {AppLine}
            </div>
        );
    }
});

module.exports = ProviderItem;