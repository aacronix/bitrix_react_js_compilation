'use strict';

import React from 'react';
import ProviderItem from '../providerItem/providerItem.jsx';
/*
 *
 * Компонент листа провайдеров
 *
 * каждый элемент списка - провайдер определенного виджета
 *
 * */
var ProviderList = React.createClass({
    getInitialState: function () {
        return {
            widgetId: this.props.widgetId
        }
    },

    render: function () {
        var storage = window.Tabs;

        var _this = this;
        var activeProvider = storage.activeTabId;

        return (
            <div className="providers b-option">
                <p className="title">Провайдеры</p>
                {storage.tabsList[this.state.widgetId].providers_list.map((element, i) => (
                    <ProviderItem key={'provider_item_' + i}
                                  name={element.name}
                                  providerId={i}
                                  widgetId={this.state.widgetId}/>
                ))}
            </div>
        );
    }
});

module.exports = ProviderList;