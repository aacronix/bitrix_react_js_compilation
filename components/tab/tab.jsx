import React from 'react';

var Tab = React.createClass({
    getInitialState: function () {
        return {
            id: this.props.id,
            DomId: ('tab_' + this.props.id)
        }
    },

    componentDidMount: function () {
        window.GlobalStorage.bind('delete-widget', this.componentWillUnmount);
    },

    componentWillUnmount: function () {
        // React.unmountComponentAtNode(document.getElementById(this.state.DomId));
    },

    _handleClick: function () {
        AppDispatcher.dispatch({
            eventName: 'tab-changing',
            newItem: this.state.id
        });
    },

    _copyWidget: function (widget) {
        var url = '/bitrix/tools/weather_service/api.php';

        var newName = 'Copy of ' + widget.widget.name;

        $.ajax({
            type: "POST",
            url: url,
            dataType: 'json',
            data: {
                action: 'copy_widget',
                name: newName,
                information: widget.options.information,
                providersList: widget.options.providers_list
            },
            success: function (data) {
                if (data.code){
                    AppDispatcher.dispatch({
                        eventName: 'copy-widget-success',
                        newItem: data
                    });
                } else {
                    AppDispatcher.dispatch({
                        eventName: 'copy-widget-failed',
                        newItem: null
                    });
                }
            }.bind(this)
        });
    },

    _handleCopyWidget: function () {
        var storage = window.GlobalStorage;
        var id = this.state.id;
        var widget = storage.widgetsList[id];

        this._copyWidget(widget);
    },
    
    render: function () {
        var storage = window.GlobalStorage;
        var id = this.state.id;

        var activeClass = (storage.activeTabId === id ? 'active' : '');

        var widget = storage.widgetsList[id].widget;

        var className = 'inactive';
        if (!storage.dataInAction) {
            className = 'active';
        }
        
        var element =
            <div className={activeClass}>
                <a href={'#' + widget.widget_id}
                   onClick={this._handleClick}
                   className="tab-element">{widget.name}</a>
            </div>;

        if (id == 0) {
            element =
                <div className={activeClass + ' default-widget'}>
                    <a href={'#' + widget.widget_id}
                       onClick={this._handleClick}
                       className="tab-element">{widget.name}</a>
                <span onClick={this._handleCopyWidget}
                      className={'copy-widget ' + className}>+</span>
                </div>
        }

        return (
            element
        );
    }
});

module.exports = Tab;