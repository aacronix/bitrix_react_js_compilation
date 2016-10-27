import React from "react";
import ReactDOM from "react-dom";
import NotificationSystem from "react-notification-system";
import YandexMap from "../components/yandexMap/yandexMap.jsx";
import TabsList from "../components/tabsList/tabsList.jsx";
import FooterButtonDock from "../components/footerButtonDock/footerButtonDock.jsx";

var deepcopy = require("deepcopy");

const WS_TAG = "bitrix_weather_module";

console.clear();
console.log(window.pageLang);

window.appInformation = {};

window.providersInfo = {};

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

function notificationTrigger(title, message, level) {
    window.notificationSystem.addNotification({
        title: title,
        message: message,
        level: level,
        position: 'tr',
        autoDismiss: 8
    });
}

window.GlobalStorage = {
    widgetsList: [],
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
                widgetStore.dataHash = JSON.stringify(widgetStore.widgetsList).hashCode();
                widgetStore.trigger('notify-system');
                notificationTrigger('Форма отправлена', 'Форма успешно сохранена', 'success');
                break;
            case 'data-not-changed':
                notificationTrigger('Форма не отправлена', 'Форма не отправлена, т.к. на ней не были внесены изменения', 'info');
                break;
            case 'form-has-errors':
                notificationTrigger('Форма не отправлена', 'Форма не отправлена, т.к. как содержит ошибки', 'warning');
                break;
            case 'widgets-updated-failed':
                notificationTrigger('Форма не отправлена', 'Форма не отправлена, проблемы с сервером', 'warning');
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
            case 'providers-information-loaded':
                window.providersInfo = payload.newItem;
                break;
            case 'app-information-loaded':
                window.appInformation = payload.newItem;
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
    getInitialState: function () {
        return {
            componentLoadedData: false
        }
    },

    _loadParametersFromServer: function () {
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

                this.setState({
                    componentLoadedData: true
                });
            }.bind(this)
        });
    },

    _loadProviderInfo: function () {
        $.getJSON("/react/src/providersInfo.json", function (json) {
            AppDispatcher.dispatch({
                eventName: 'providers-information-loaded',
                newItem: json
            });
        });
    },

    _loadAppInfo: function () {
        $.getJSON("/react/src/appInformation.json", function (json) {
            AppDispatcher.dispatch({
                eventName: 'app-information-loaded',
                newItem: json
            });
        });
    },

    changeState: function () {
        this.forceUpdate();
    },

    componentDidMount: function () {
        window.GlobalStorage.bind('change', this.changeState);
        window.notificationSystem = this.refs.notificationSystem;
        this._loadAppInfo();
        this._loadProviderInfo();
        this._loadParametersFromServer();
    },

    render: function () {
        var renderContent =
            <div>
                <YandexMap/>
                <TabsList/>
                <FooterButtonDock />
            </div>;

        if (!this.state.componentLoadedData) {
            renderContent = null
        }
        return (
            <div className='bitrix-frendly'>
                <NotificationSystem ref='notificationSystem'/>
                {renderContent}
            </div>
        )
    }
});

// <GoogleMapComponent/>

ReactDOM.render(<App/>, document.getElementById('weather-container'));