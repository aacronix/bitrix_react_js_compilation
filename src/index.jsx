import React from 'react';
import ReactDOM from 'react-dom';
import YandexMap from '../components/yandexMap/yandexMap.jsx';
import TabsList from '../components/tabsList/tabsList.jsx';
import {MaterialPicker} from 'react-color';

var deepcopy = require("deepcopy");


console.clear();
console.log(window.pageLang);

window.PointsList = {
    objectPosition: [],
    mapCenter: []
};

window.providersInfo = {
    ru: {
        "openweather": {
            name: "Open Weather",
            link: "https://openweathermap.org/",
            api: true,
            app: false,
            rightKeys: {
                api: [],
                app: []
            }
        },
        "apixu": {
            name: "Apixu",
            link: "http://www.apixu.com/",
            api: true,
            app: false,
            rightKeys: {
                api: [],
                app: []
            }
        },
        "weathertrigger": {
            name: "Weather Trigger",
            link: "http://www.weatherunlocked.com/",
            api: true,
            app: true,
            rightKeys: {
                api: [],
                app: []
            }
        },
        "forecastio": {
            name: "Darksky Net",
            link: "https://www.wunderground.com/weather/api",
            api: true,
            app: false,
            rightKeys: {
                api: [],
                app: []
            }
        },
        "wunderground": {
            name: "Wunderground",
            link: "https://darksky.net/dev/",
            api: true,
            app: false,
            rightKeys: {
                api: [],
                app: []
            }
        },
        "yahooweather": {
            name: "Yahoo Weather",
            link: "https://developer.yahoo.com/weather/",
            api: false,
            app: false,
            rightKeys: {
                api: [],
                app: []
            }
        }
    }
};

window.GlobalStorage = {
    widgetsList: [{
        widget: {
            widget_id: 'w_0',
            active: true,
            name: 'Default',
            super: true,
        },
        options: {
            information: {
                name: "w_0",
                latitude: 0,
                longitude: 0,
                weather_provider: "yahooweather",
                widget_title: "default",
                background_color: "rgba(255, 0, 0, 1)",
                major_text_color: "#ffffff",
                extra_text_color: "#ffffff",
                update_interval: 120,
                show_provider_info: false,
                measurement_system: "metrical",
            },
            providers_list: [
                {
                    name: "wunderground",
                    api_key: "",
                    app_key: "",
                    activity: false
                },
                {
                    name: "forecastio",
                    api_key: "",
                    app_key: "",
                    activity: false
                },
                {
                    name: "weathertrigger",
                    api_key: "",
                    app_key: "",
                    activity: false
                },
                {
                    name: "apixu",
                    api_key: "",
                    app_key: "",
                    activity: false
                },
                {
                    name: "openweather",
                    api_key: "",
                    app_key: "",
                    activity: false
                },
                {
                    name: "yahooweather",
                    api_key: "",
                    app_key: "",
                    activity: true
                }
            ]
        }
    },
        {
            widget: {
                widget_id: 'w_1',
                active: true,
                name: 'Default 1',
                super: false
            },
            options: {
                information: {
                    name: "w_1",
                    latitude: 0,
                    longitude: 0,
                    weather_provider: "yahooweather",
                    widget_title: "default 2",
                    background_color: "rgba(0, 0, 0, 1)",
                    major_text_color: "#ffffff",
                    extra_text_color: "#ffffff",
                    update_interval: 120,
                    show_provider_info: false,
                    measurement_system: "metrical",
                },
                providers_list: [
                    {
                        name: "wunderground",
                        api_key: "",
                        app_key: "",
                        activity: false
                    },
                    {
                        name: "forecastio",
                        api_key: "",
                        app_key: "",
                        activity: false
                    },
                    {
                        name: "weathertrigger",
                        api_key: "",
                        app_key: "",
                        activity: false
                    },
                    {
                        name: "apixu",
                        api_key: "",
                        app_key: "",
                        activity: false
                    },
                    {
                        name: "openweather",
                        api_key: "",
                        app_key: "",
                        activity: false
                    },
                    {
                        name: "yahooweather",
                        api_key: "",
                        app_key: "",
                        activity: true
                    }
                ]
            }
        }],
    activeTabId: 0
};

MicroEvent.mixin(GlobalStorage);

window.AppDispatcher = {
    register: function (payload) {
        var widgetStore = window.GlobalStorage;

        switch (payload.eventName) {
            case 'map-click':
                widgetStore.widgetsList[widgetStore.activeTabId].options.latitude = payload.newItem[0];
                widgetStore.widgetsList[widgetStore.activeTabId].options.longitude = payload.newItem[1];
                break;
            case 'tab-changing':
                widgetStore.activeTabId = payload.newItem;
                widgetStore.trigger('change-tab');
                break;
            case 'change-provider':
                for (var i = 0; i < widgetStore.widgetsList[payload.newItem[0]].options.providers_list.length; i++) {
                    widgetStore.widgetsList[payload.newItem[0]].options.providers_list[i].activity = false;
                }
                widgetStore.widgetsList[payload.newItem[0]].options.providers_list[payload.newItem[1]].activity = true;
                break;
            case 'change-update-interval':
                widgetStore.widgetsList[payload.newItem[0]].options.information.update_interval = payload.newItem[1];
                break;
            case 'change-measurement-system':
                widgetStore.widgetsList[payload.newItem[0]].options.information.measurement_system = payload.newItem[1];
                break;
            case 'change-bg-color':
                widgetStore.widgetsList[payload.newItem[0]].options.information.background_color = payload.newItem[1];
                break;
            case 'change-major-text-color':
                widgetStore.widgetsList[payload.newItem[0]].options.information.major_text_color = payload.newItem[1];
                break;
            case 'change-extra-text-color':
                widgetStore.widgetsList[payload.newItem[0]].options.information.extra_text_color = payload.newItem[1];
                break;
            case 'change-widget-title':
                widgetStore.widgetsList[payload.newItem[0]].options.information.widget_title = payload.newItem[1];
                break;
            case 'change-widget-name':
                widgetStore.widgetsList[payload.newItem[0]].widget.name = payload.newItem[1];
                break;
            case 'change-show-provider-info':
                widgetStore.widgetsList[payload.newItem[0]].options.information.show_provider_info = payload.newItem[1];
                break;
            case 'copy-widget':
                widgetStore.widgetsList.push(payload.newItem);
                break;
            case 'delete-widget':
                widgetStore.widgetsList.splice(payload.newItem[0], 1);
                widgetStore.activeTabId = 0;
                widgetStore.trigger('delete-widget');
                break;
            case 'options-information-loaded':
                widgetStore.widgetsList = payload.newItem;
                break;
            case 'change-api-key-input':
                widgetStore.widgetsList[payload.newItem[0]].options.providers_list[payload.newItem[1].id].api_key = payload.newItem[1].value;
                break;
            case 'change-app-key-input':
                widgetStore.widgetsList[payload.newItem[0]].options.providers_list[payload.newItem[1].id].app_key = payload.newItem[1].value;
                break;
        }

        widgetStore.trigger('change');
    },
    dispatch: function (payload) {
        this.register(payload);
    }
};

var App = React.createClass({
    loadParametresFromServer: function () {
        var url = '/bitrix/tools/weather_service/get_all_option_list.php';

        $.ajax({
            type: "POST",
            url: url,
            dataType: 'json',
            success: function (data) {
                AppDispatcher.dispatch({
                    eventName: 'options-information-loaded',
                    newItem: data
                });
            }.bind(this)
        });
    },

    componentDidMount: function () {
        this.loadParametresFromServer();
    },

    render: function () {
        return (
            <div className="bitrix-frendly">
                <YandexMap/>
                <TabsList/>
            </div>
        )
    }
});

ReactDOM.render(<App/>, document.getElementById('weather-container'));