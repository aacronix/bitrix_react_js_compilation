import React from 'react';

var Tab = React.createClass({
    getInitialState: function () {
        return {
            id: this.props.id
        }
    },

    _handleClick: function () {
        AppDispatcher.dispatch({
            eventName: 'tab-changing',
            newItem: this.state.id
        });
    },

    _handleCopyWidget: function () {
        AppDispatcher.dispatch({
            eventName: 'copy-widget',
            newItem: null
        });
    },
    
    render: function () {
        var storage = window.Tabs;
        var id = this.state.id;

        var activeClass = (storage.activeTabId === id ? 'active' : '');

        var widget = storage.tabsList[id];

        var element =
            <div className={activeClass}>
                <a href={'#' + widget.name}
                   onClick={this._handleClick}
                   className="tab-element">{widget.widget_title}</a>
            </div>;

        if (id == 0) {
            element =
                <div className={activeClass + ' default-widget'}>
                    <a href={'#' + widget.name}
                       onClick={this._handleClick}
                       className="tab-element">{widget.widget_title}</a>
                <span onClick={this._handleCopyWidget}
                      className="copy-widget">+</span>
                </div>
        }

        return (
            element
        );
    }
});

module.exports = Tab;