import React from 'react';
import ReactDOM from 'react-dom';
import NotificationSystem from 'react-notification-system';
import YandexMap from '../components/yandexMap/yandexMap.jsx';
import GoogleMapComponent from '../components/googleMapComponent/googleMapComponent.jsx';
import TabsList from '../components/tabsList/tabsList.jsx';
import FooterButtonDock from '../components/footerButtonDock/footerButtonDock.jsx';
import {MaterialPicker} from 'react-color';

var deepcopy = require("deepcopy");

const WS_TAG = "bitrix_weather_module";

console.clear();
console.log(window.pageLang);

window.appInformation = {
    ru: {
        map: 'yandex'
    },
    en: {
        map: 'google',
        key: 'AIzaSyCopIU2L_Js_9dKgFaZxmpwtjW6sv-Zudw'
    }
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

window.notificationSystem = null;

String.prototype.hashCode = function () {
    var hash = 0, i, chr, len;
    if (this.length === 0) return hash;
    for (i = 0, len = this.length; i < len; i++) {
        chr = this.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
};

function notifiationSystem(title, message, level) {
    window.notificationSystem.addNotification({
        title: title,
        message: message,
        level: level,
        position: 'tr',
        autoDismiss: 8
    });
}

window.GlobalStorage = {
    widgetsList: [{
        widget: {
            widget_id: 'w_0',
            active: 1,
            name: 'Default',
            super: 1
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
                show_provider_info: 0,
                measurement_system: "metrical"
            },
            providers_list: [
                {
                    name: "wunderground",
                    api_key: "",
                    app_key: "",
                    activity: 0
                },
                {
                    name: "forecastio",
                    api_key: "",
                    app_key: "",
                    activity: 0
                },
                {
                    name: "weathertrigger",
                    api_key: "",
                    app_key: "",
                    activity: 0
                },
                {
                    name: "apixu",
                    api_key: "",
                    app_key: "",
                    activity: 0
                },
                {
                    name: "openweather",
                    api_key: "",
                    app_key: "",
                    activity: 0
                },
                {
                    name: "yahooweather",
                    api_key: "",
                    app_key: "",
                    activity: 1
                }
            ]
        }
    },
        {
            widget: {
                widget_id: 'w_1',
                active: 1,
                name: 'Default 1',
                super: 0
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
                    show_provider_info: 0,
                    measurement_system: "metrical",
                },
                providers_list: [
                    {
                        name: "wunderground",
                        api_key: "",
                        app_key: "",
                        activity: 0
                    },
                    {
                        name: "forecastio",
                        api_key: "",
                        app_key: "",
                        activity: 0
                    },
                    {
                        name: "weathertrigger",
                        api_key: "",
                        app_key: "",
                        activity: 0
                    },
                    {
                        name: "apixu",
                        api_key: "",
                        app_key: "",
                        activity: 0
                    },
                    {
                        name: "openweather",
                        api_key: "",
                        app_key: "",
                        activity: 0
                    },
                    {
                        name: "yahooweather",
                        api_key: "",
                        app_key: "",
                        activity: 1
                    }
                ]
            }
        }],
    activeTabId: 0,
    savedWS: false,
    dataHash: '',
    globalValid: true,
    dataInAction: false,
    globalCollapse: true
};

MicroEvent.mixin(GlobalStorage);

window.AppDispatcher = {
    register: function (payload) {
        var widgetStore = window.GlobalStorage;
        widgetStore.savedWS = false;

        switch (payload.eventName) {
            case 'map-click':
                widgetStore.widgetsList[widgetStore.activeTabId].options.information.latitude = payload.newItem[0];
                widgetStore.widgetsList[widgetStore.activeTabId].options.information.longitude = payload.newItem[1];
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
                widgetStore.widgetsList[payload.newItem[0]].options.information.weather_provider = widgetStore.widgetsList[payload.newItem[0]].options.providers_list[payload.newItem[1]].name;
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
                // widgetStore.dataHash = JSON.stringify(widgetStore.widgetsList).hashCode();
                widgetStore.savedWS = true;
                break;
            case 'delete-widget':
                widgetStore.widgetsList.splice(widgetStore.activeTabId, 1);
                widgetStore.activeTabId--;
                widgetStore.trigger('delete-widget');
                break;
            case 'options-information-loaded':
                widgetStore.widgetsList = payload.newItem;
                widgetStore.dataHash = JSON.stringify(widgetStore.widgetsList).hashCode();
                console.log(widgetStore.dataHash);
                break;
            case 'change-api-key-input':
                widgetStore.widgetsList[payload.newItem[0]].options.providers_list[payload.newItem[1].id].api_key = payload.newItem[1].value;
                break;
            case 'change-app-key-input':
                widgetStore.widgetsList[payload.newItem[0]].options.providers_list[payload.newItem[1].id].app_key = payload.newItem[1].value;
                break;
            case 'widgets-updated-success':
                widgetStore.trigger('widgets-updated-success');
                // widgetStore.dataHash = JSON.stringify(widgetStore.widgetsList).hashCode();
                widgetStore.trigger('notify-system');
                notifiationSystem('Форма отправлена', 'Форма успешно сохранена', 'success');
                break;
            case 'data-not-changed':
                notifiationSystem('Форма не отправлена', 'Форма не отправлена, т.к. на ней не были внесены изменения', 'info');
                break;
            case 'form-has-errors':
                notifiationSystem('Форма не отправлена', 'Форма не отправлена, т.к. как содержит ошибки', 'warning');
                break;
            case 'widgets-updated-failed':
                notifiationSystem('Форма не отправлена', 'Форма не отправлена, проблемы с сервером', 'warning');
                widgetStore.trigger('widgets-updated-failed');
                break;
            case 'data-validation':
                console.log('data-validation');
                widgetStore.globalValid = true;
                widgetStore.trigger('validation-require');
                break;
            case 'change-global-validation':
                widgetStore.globalValid = payload.newItem;
                break;
            case 'change-valid-state':
                widgetStore.widgetsList[payload.newItem[2]].options.providers_list[payload.newItem[1]].valid = payload.newItem[0];
                break;
            case 'set-data-action':
                widgetStore.dataInAction = payload.newItem;
                break;
            case 'change-collapse':
                widgetStore.globalCollapse = !widgetStore.globalCollapse;
                break;
            case 'notifiy-form-sending':
                break;
            default:
                widgetStore.savedWS = false;
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
                console.log(data);
                AppDispatcher.dispatch({
                    eventName: 'options-information-loaded',
                    newItem: data
                });
            }.bind(this)
        });
    },

    changeState: function () {
        this.forceUpdate();
    },

    componentDidMount: function () {
        window.GlobalStorage.bind('change', this.changeState);
        this.loadParametresFromServer();
        window.notificationSystem = this.refs.notificationSystem;
    },

    render: function () {
        return (
            <div className="bitrix-frendly">
                <YandexMap/>
                <TabsList/>
                <FooterButtonDock />
                <NotificationSystem ref="notificationSystem" />
            </div>
        )
    }
});

// <GoogleMapComponent/>

ReactDOM.render(<App/>, document.getElementById('weather-container'));