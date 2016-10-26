'use strict';

import React from "react";
import ProviderItem from "../providerItem/providerItem.jsx";
import ReactCollapse from "react-collapse"
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

    _changeCollapse: function () {
        AppDispatcher.dispatch({
            eventName: 'change-collapse',
            newItem: null
        });
    },

    render: function () {
        var storage = window.GlobalStorage;

        var className = 'active';
        if (!storage.globalCollapse){
            className = 'inactive';
        }
        return (
            <div className="providers b-option">
                <p className="title">Провайдеры<span className={'collapse-control ' + className} onClick={this._changeCollapse}></span></p>
                <ReactCollapse isOpened={storage.globalCollapse}>
                    {storage.widgetsList[this.state.widgetId].options.providers_list.map((element, i) => (
                        <ProviderItem key={'provider_item_' + i}
                                      name={element.name}
                                      providerId={i}
                                      widgetId={this.state.widgetId}/>
                    ))}
                </ReactCollapse>
            </div>
        );
    }
});

module.exports = ProviderList;