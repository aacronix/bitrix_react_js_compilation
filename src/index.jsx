import React from 'react';
import ReactDOM from 'react-dom';
import YandexMap from '../components/yandexMap/yandexMap.jsx';
import TabsList from '../components/tabsList/tabsList.jsx';

import {MaterialPicker} from 'react-color';


console.clear();

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
            app: false
        },
        "apixu": {
            name: "Apixu",
            link: "http://www.apixu.com/",
            api: true,
            app: false
        },
        "weathertrigger": {
            name: "Weather Trigger",
            link: "http://www.weatherunlocked.com/",
            api: true,
            app: true
        },
        "yahooweather": {
            name: "Yahoo Weather",
            link: "https://developer.yahoo.com/weather/",
            api: false,
            app: false
        },
        "forecastio": {
            name: "Darksky Net",
            link: "https://www.wunderground.com/weather/api",
            api: true,
            app: false
        },
        "wunderground": {
            name: "Wunderground",
            link: "https://darksky.net/dev/",
            api: true,
            app: false
        }
    }
};

window.Tabs = {
    tabsList: [{
        "super": true,
        "name": "w_0",
        "latitude": 55.55,
        "longitude": 44.45,
        "weather_provider": "yahooweather",
        "widget_title": "Погода в Йошкар-Оле",
        "widget_name" : "default",
        "wunderground_api_key": "",
        "forecastio_api_key": "",
        "weathertrigger_api_key": "",
        "weathertrigger_app_key": "",
        "apixu_api_key": "",
        "openweather_api_key": "",
        "background_color": "rgba(255, 0, 255, 1)",
        "major_text_color": "#ffffff",
        "extra_text_color": "#ffffff",
        "update_interval": 30,
        "show_provider_info": false,
        "measurement_system": "metrical",
        "providers_list": [
            {
                "name": "openweather",
                "api_key": "3856eec20ac69363422392a1f2ce262f",
                "app_key": ""
            },
            {
                "name": "apixu",
                "api_key": "b813f52733db4348bfc140812161409",
                "app_key": ""
            },
            {
                "name": "weathertrigger",
                "api_key": "",
                "app_key": ""
            },
            {
                "name" : "yahooweather",
                "api_key": "",
                "app_key": ""
            },
            {
                "name" : "forecastio",
                "api_key": "",
                "app_key": ""
            },
            {
                "name" : "wunderground",
                "api_key": "",
                "app_key": ""
            }
        ],
        "active_provider_ref": {
            "name": "yahooweather",
            "api_key": "",
            "app_key": ""
        }
    }, {
        "super": false,
        "name": "w_1",
        "latitude": 45.55,
        "longitude": 44.45,
        "widget_name" : "Казань",
        "weather_provider": "forecastio",
        "widget_title": "Погода в Казани",
        "wunderground_api_key": "",
        "forecastio_api_key": "",
        "weathertrigger_api_key": "",
        "weathertrigger_app_key": "",
        "apixu_api_key": "",
        "openweather_api_key": "",
        "background_color": "rgba(0, 0, 0, 1)",
        "major_text_color": "#ffffff",
        "extra_text_color": "#ffffff",
        "update_interval": 360,
        "show_provider_info": true,
        "measurement_system": "metrical",
        "providers_list": [
            {
                "name": "openweather",
                "api_key": "3856eec20ac69363422392a1f2ce262f",
                "app_key": ""
            },
            {
                "name": "apixu",
                "api_key": "b813f52733db4348bfc140812161409",
                "app_key": ""
            },
            {
                "name": "weathertrigger",
                "api_key": "safb813f52733db4348bfc140812161409",
                "app_key": "aofiuyh387rq48rcfml"
            },
            {
                "name" : "yahooweather",
                "api_key": "",
                "app_key": ""
            },
            {
                "name" : "forecastio",
                "api_key": "",
                "app_key": ""
            },
            {
                "name" : "wunderground",
                "api_key": "",
                "app_key": ""
            }
        ],
        "active_provider_ref": {
            "name": "yahooweather",
            "api_key": "",
            "app_key": ""
        }
    }, {
        "super": false,
        "name": "w_2",
        "latitude": 35.55,
        "longitude": 44.45,
        "weather_provider": "apixu",
        "widget_title": "Погода в Нижнем Новгороде",
        "widget_name" : "Нижний Новгород",
        "wunderground_api_key": "",
        "forecastio_api_key": "",
        "weathertrigger_api_key": "",
        "weathertrigger_app_key": "",
        "apixu_api_key": "",
        "openweather_api_key": "",
        "background_color": "rgba(0, 0, 0, 1)",
        "major_text_color": "#f0f",
        "extra_text_color": "#3d3",
        "update_interval": 120,
        "show_provider_info": true,
        "measurement_system": "britain",
        "providers_list": [
            {
                "name": "openweather",
                "api_key": "3856eec20ac69363422392a1f2ce262f",
                "app_key": ""
            },
            {
                "name": "apixu",
                "api_key": "b813f52733db4348bfc140812161409",
                "app_key": ""
            },
            {
                "name": "weathertrigger",
                "api_key": "safb813f52733db4348bfc140812161409",
                "app_key": "aofiuyh387rq48rcfml"
            },
            {
                "name" : "yahooweather",
                "api_key": "",
                "app_key": ""
            },
            {
                "name" : "forecastio",
                "api_key": "",
                "app_key": ""
            },
            {
                "name" : "wunderground",
                "api_key": "",
                "app_key": ""
            }
        ],
        "active_provider_ref": {
            "name": "yahooweather",
            "api_key": "",
            "app_key": ""
        }
    }],
    activeTabId: 0
};

MicroEvent.mixin(PointsList);
MicroEvent.mixin(Tabs);

window.AppDispatcher = {
    register: function (payload) {
        var tabStore = window.Tabs;

        switch (payload.eventName) {
            case 'map-click':
                tabStore.tabsList[tabStore.activeTabId].latitude = payload.newItem[0];
                tabStore.tabsList[tabStore.activeTabId].longitude = payload.newItem[1];
                break;
            case 'tab-changing':
                tabStore.activeTabId = payload.newItem;
                break;
            case 'change-provider':
                tabStore.tabsList[payload.newItem[0]].weather_provider = payload.newItem[1];
                break;
            case 'change-update-interval':
                tabStore.tabsList[payload.newItem[0]].update_interval = payload.newItem[1];
                break;
            case 'change-measurement-system':
                tabStore.tabsList[payload.newItem[0]].measurement_system = payload.newItem[1];
                break;
            case 'change-bg-color':
                tabStore.tabsList[payload.newItem[0]].background_color = payload.newItem[1];
                break;
            case 'change-major-text-color':
                tabStore.tabsList[payload.newItem[0]].major_text_color = payload.newItem[1];
                break;
            case 'change-extra-text-color':
                tabStore.tabsList[payload.newItem[0]].extra_text_color = payload.newItem[1];
                break;
            case 'change-widget-title':
                tabStore.tabsList[payload.newItem[0]].widget_title = payload.newItem[1];
                break;
            case 'change-widget-name':
                tabStore.tabsList[payload.newItem[0]].widget_name = payload.newItem[1];
                break;
            case 'change-show-provider-info':
                tabStore.tabsList[payload.newItem[0]].show_provider_info = payload.newItem[1];
                break;
            case 'copy-widget':
                var sliced = tabStore.tabsList.slice();
                var newObject = Object.assign({}, sliced[0]);
                newObject.super = false;
                tabStore.tabsList.push(newObject);
                break;
            case 'delete-widget':
                tabStore.tabsList.splice(payload.newItem[0], 1);
                tabStore.activeTabId = 0;
                break;
        }

        tabStore.trigger('change');
    },
    dispatch: function (payload) {
        this.register(payload);
    }
};

var App = React.createClass({
    render: function () {
        var _this = this;
        var storage = window.Tabs;
        return (
            <div className="bitrix-frendly">
                <YandexMap/>
                <TabsList data={storage.tabsList}/>
            </div>
        )
    }
});

ReactDOM.render(<App/>, document.getElementById('weather-container'));