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

    componentDidMount: function () {
        this._loadTemplateFromServer();
    },

    render: function () {
        var storage = window.GlobalStorage;
        var activeTabId = storage.activeTabId;

        return (
            <ReactMustache template={this.state.template} data={{widgetId: storage.widgetsList[activeTabId].widget.widget_id,
            backgroundColor: storage.widgetsList[activeTabId].options.information.background_color,
            majorTextColor: storage.widgetsList[activeTabId].options.information.major_text_color,
            extraTextColor: storage.widgetsList[activeTabId].options.information.extra_text_color,
            windDirectionMessage: 'северный',
            time: 'Четверг, 27 Октября',
            widgetTitle: storage.widgetsList[activeTabId].options.information.widget_title,
            temp: -33,
            tempUnit: 'C',
            icon: 'wi-rain',
            hasProviderInfo: storage.widgetsList[activeTabId].options.information.show_provider_info,
            from: 'options',
            providerName: storage.widgetsList[activeTabId].options.information.weather_provider
            }}/>
        );
    }
});

module.exports = PreviewManager;