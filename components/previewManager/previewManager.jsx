'use strict';

import React from "react";
import ReactMustache from "react-mustache";

var PreviewManager = React.createClass({
    getInitialState: function () {
        return {
            template: '',
            templateName: this.props.templateName
        }
    },

    componentDidMount: function () {
        // window.GlobalStorage.bind('change', this.changeState);
        this._loadTemplateFromServer();
    },

    changeState: function () {
        this.forceUpdate();
    },

    _loadTemplateFromServer: function () {
        var url = '/bitrix/tools/weather_service/get_page_template.php';

        $.ajax({
            type: "GET",
            url: url,
            data: {
                template_name: this.state.templateName
            },
            dataType: 'json',
            success: function (data) {
                console.log(data);
                this.setState({
                    template: data.content
                });
            }.bind(this)
        });
    },

    render: function () {
        var storage = window.GlobalStorage;
        var activeTabId = storage.activeTabId;

        return (
            <div className="b-weather-preview">
                <ReactMustache template={this.state.template} data={{widgetId: storage.widgetsList[activeTabId].widget.widget_id,
                                                                    backgroundColor: storage.widgetsList[activeTabId].options.information.background_color,
                                                                    majorTextColor: storage.widgetsList[activeTabId].options.information.major_text_color,
                                                                    majorTextSize: storage.widgetsList[activeTabId].options.information.major_text_size,
                                                                    extraTextColor: storage.widgetsList[activeTabId].options.information.extra_text_color,
                                                                    extraTextSize: storage.widgetsList[activeTabId].options.information.extra_text_size,
                                                                    temperatureTextSize: storage.widgetsList[activeTabId].options.information.temperature_text_size,
                                                                    temperatureIconSize: storage.widgetsList[activeTabId].options.information.temperature_icon_size,
                                                                    weatherIconSize: storage.widgetsList[activeTabId].options.information.weather_icon_size,
                                                                    windDirectionMessage: 'северный',
                                                                    time: 'Четверг, 27 Октября',
                                                                    widgetTitle: storage.widgetsList[activeTabId].options.information.widget_title,
                                                                    fontFamily: storage.widgetsList[activeTabId].options.information.font_family,
                                                                    temp: -33,
                                                                    tempUnit: 'C',
                                                                    icon: 'wi-rain',
                                                                    hasProviderInfo: ((storage.widgetsList[activeTabId].options.information.show_provider_info.toString() === "true") ? true : false),
                                                                    from: 'options',
                                                                    providerName: storage.widgetsList[activeTabId].options.information.weather_provider,
                                                                    borderColor: storage.widgetsList[activeTabId].options.information.border_color
                                                                    }}/>
            </div>
        );
    }
});

module.exports = PreviewManager;