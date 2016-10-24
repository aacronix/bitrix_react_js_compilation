import React from 'react';

const ENTRY_POINT = "http://bitrix-module-experience.local/";

function prevBeKey(name, key, qualifier) {
    if (qualifier == 'api') {
        //noinspection JSDuplicatedDeclaration
        for (var i = 0; i < window.providersInfo.ru[name].rightKeys.api.length; i++) {
            if (window.providersInfo.ru[name].rightKeys.api[i] == key) {
                return true;
            }
        }
    } else if (qualifier == 'app') {
        for (var i = 0; i < window.providersInfo.ru[name].rightKeys.app.length; i++) {
            if (window.providersInfo.ru[name].rightKeys.app[i] == key) {
                return true;
            }
        }
    }

    return false;
}

var ProviderItem = React.createClass({
    getInitialState: function () {
        return {
            widgetId: this.props.widgetId,
            name: this.props.name,
            activeTabId: window.GlobalStorage.activeTabId,
            id: this.props.providerId,
            valid: true,
            validationStarted: false,
            apiHasLength: true,
            appHasLength: true
        };
    },

    componentDidMount: function () {
        window.GlobalStorage.bind('validation-require', this._validate);
    },

    _validate: function () {
        var storage = window.GlobalStorage;
        var providers = storage.widgetsList[this.state.widgetId].options.providers_list;
        var id = this.state.id;

        console.log(providers[id].api_key.length);
        console.log(providers[id].activity);
        console.log(this.state.valid);

        if ((providers[id].activity && providers[id].api_key.length == 0 && window.providersInfo.ru[this.state.name].api) || // если поле активно и должно иметь значение но значения нет
            (!this.state.valid && providers[id].activity) ||  // если поле невалидно и активно
            (!this.state.valid )) { // если поле невалидно
            AppDispatcher.dispatch({
                eventName: 'change-global-validation',
                newItem: false
            });
            AppDispatcher.dispatch({
                eventName: 'notifiy',
                newItem: false
            });
        }

        if ((providers[id].activity && providers[id].app_key.length == 0 && window.providersInfo.ru[this.state.name].app) || // если поле активно и должно иметь значение но значения нет
            (!this.state.valid && providers[id].activity) || // если поле невалидно и активно
            (!this.state.valid)) { // если поле невалидно)
            AppDispatcher.dispatch({
                eventName: 'change-global-validation',
                newItem: false
            });

            AppDispatcher.dispatch({
                eventName: 'notifiy',
                newItem: false
            });
        }
    },

    _handleOptionChange: function () {
        AppDispatcher.dispatch({
            eventName: 'change-provider',
            newItem: [this.state.widgetId, this.state.id]
        });
    },
    /*
     * валидация ключа, если ключ до этого уже проверялся и он был валиден, то он не отправляется на сервер для проверки
     */
    _validateKey: function () {
        var storage = window.GlobalStorage;
        var providers = storage.widgetsList[this.state.widgetId].options.providers_list;
        var url = ENTRY_POINT + '/bitrix/tools/weather_service/weather_api.php';

        var bePrevApiKey = prevBeKey(providers[this.state.id].name, providers[this.state.id].api_key, 'api');
        var bePrevAppKey = prevBeKey(providers[this.state.id].name, providers[this.state.id].app_key, 'app');

        if (!bePrevApiKey || !bePrevAppKey) {
            return $.ajax({
                typ: "GET",
                url: url,
                dataType: 'json',
                data: {
                    action: 'validateKey',
                    provider: providers[this.state.id].name,
                    apiKey: providers[this.state.id].api_key,
                    appKey: providers[this.state.id].app_key
                },
                beforeSend: function () {
                    AppDispatcher.dispatch({
                        eventName: 'set-data-action',
                        newItem: true
                    });
                },
                complete: function () {
                    AppDispatcher.dispatch({
                        eventName: 'set-data-action',
                        newItem: false
                    });
                },
                success: function (data) {
                    if (data.code == 1) {
                        this.setState({valid: true}); // TODO: переделать на события
                        window.providersInfo.ru[providers[this.state.id].name].rightKeys.api.push(providers[this.state.id].api_key);
                        window.providersInfo.ru[providers[this.state.id].name].rightKeys.app.push(providers[this.state.id].app_key);
                    } else {
                        this.setState({valid: false});
                    }

                    if (data.code == 2) {
                        this.setState({apiHasLength: false, appHasLength: false, valid: true});
                    } else {
                        this.setState({apiHasLength: true, appHasLength: true});
                    }

                    this.setState({validationStarted: true});
                }.bind(this)
            });
        } else {
            console.log('key be prev');
            this.setState({valid: true});
            this.setState({validationStarted: true});
        }
    },

    _handleApiInputBlur: function () {
        this._validateKey();
    },

    _handleAppInputBlur: function () {
        this._validateKey();
    },

    _handleApiKeyChange: function (event) {
        var storage = window.GlobalStorage;
        var providers = storage.widgetsList[this.state.activeTabId].options.providers_list;

        AppDispatcher.dispatch({
            eventName: 'change-api-key-input',
            newItem: [this.state.widgetId, {
                id: this.state.id,
                name: providers[this.state.id].name,
                value: event.target.value
            }]
        });
    },

    _handleAppKeyChange: function (event) {
        var storage = window.GlobalStorage;
        var providers = storage.widgetsList[this.state.activeTabId].options.providers_list;

        console.log(providers);

        AppDispatcher.dispatch({
            eventName: 'change-app-key-input',
            newItem: [this.state.widgetId, {
                id: this.state.id,
                name: providers[this.state.id].name,
                value: event.target.value
            }]
        });
    },

    render: function () {
        var storage = window.GlobalStorage;
        var providers = storage.widgetsList[this.state.widgetId].options.providers_list;

        var id = this.state.id;

        var providerInfo = providersInfo.ru[providers[this.state.id].name];

        var ApiLine;
        var AppLine;
        var className;

        if (this.state.validationStarted) {
            className = (this.state.valid ? "valid" : "invalid");
        }

        if (prevBeKey(providers[id].name, providers[id].api_key, 'api') && prevBeKey(providers[id].name, providers[id].app_key, 'app')) {
            className = "valid";
        }

        if (!this.state.apiHasLength) {
            className = '';
        }

        // строка API ключа
        if (providerInfo.api) {
            ApiLine = <div className="line clearfix">
                <p className="label">Api key:</p>
                <input type="text"
                       className={className}
                       name={providers[id].name + '_api_key'}
                       value={providers[id].api_key}
                       onBlur={this._handleApiInputBlur}
                       onChange={this._handleApiKeyChange}/>
            </div>;
        }

        // строка APP ключа
        if (providerInfo.app) {
            AppLine = <div className="line clearfix">
                <p className="label">App key:</p>
                <input type="text"
                       className={className}
                       name={providers[id].name + '_app_key'}
                       value={providers[id].app_key}
                       onBlur={this._handleAppInputBlur}
                       onChange={this._handleAppKeyChange}/>
            </div>
        }

        return (
            <div className="provider">
                <div className="line clearfix">
                    <input name={'weather_provider_' + this.state.widgetId}
                           type="radio"
                           value={providers[id].name}
                           checked={providers[id].activity}
                           onChange={this._handleOptionChange}/>
                    <a className="provider-name" href={providerInfo.link} target="_blank">{providerInfo.name}</a>
                </div>
                {ApiLine}
                {AppLine}
            </div>
        );
    }
});

module.exports = ProviderItem;