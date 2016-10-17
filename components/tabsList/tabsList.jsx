import React from 'react';
import ProviderList from '../providerList/providerList.jsx';
import ViewOptionsList from '../viewOptionsList/viewOptionsList.jsx';

var TabsList = React.createClass({
    componentDidMount: function () {
        window.Tabs.bind('change', this.changeState);
    },

    changeState: function () {
        this.forceUpdate();
    },

    _handleClick: function (tabId) {
        AppDispatcher.dispatch({
            eventName: 'tab-changing',
            newItem: tabId
        });
    },

    _handleCopyWidget: function () {
        AppDispatcher.dispatch({
            eventName: 'copy-widget',
            newItem: null
        });
    },

    _renderTabs: function (key) {
        var _this = this;
        var storage = window.Tabs;
        var activeClass = (storage.activeTabId === key ? 'active' : '');
        
        var widget = storage.tabsList[key];
        
        var element = <div key={key} id={widget.name} className={activeClass}>
            <a href={'#' + widget.name} onClick={function(){_this._handleClick(key)}}
               className="tab-element">{widget.widget_name}</a>
        </div>;

        if (key == 0) {
            element = <div key={key} id={widget.name} className={activeClass+ ' default-widget'}>
                <a href={'#' + widget.name} onClick={function(){_this._handleClick(key)}}
                   className="tab-element">{widget.widget_name}</a>
                <span onClick={_this._handleCopyWidget} className="copy-widget">+</span>
            </div>
        }

        return (
            element
        );
    },

    _renderContent: function (key) {
        var widget = window.Tabs.tabsList[key];

        return (
            <div key={key} id={widget.name}>
                <div className="tab-content clearfix">
                    <ProviderList providerList={widget.providers_list} activeProvider={widget.weather_provider}
                                  providerId={key}/>
                    <ViewOptionsList activeProvider={key}/>
                </div>
            </div>
        );
    },

    render: function () {
        var _this = this;
        var props = this.props;
        var selected = window.Tabs.activeTabId;

        return (
            <div className="tabs-wrapper">
                <div className="tab-list">
                    {window.Tabs.tabsList.map((element, i) => (
                        _this._renderTabs(i)
                    ))}
                </div>
                <div className="content-list">
                    <div className="block">
                        {_this._renderContent(selected)}
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = TabsList;