'use strict';

import React from 'react';

var FooterButtonDock = React.createClass({
    getInitialState: function () {
        return {
            activity: true
        }
    },

    componentDidMount: function () {
        window.GlobalStorage.bind('widgets-updated-success', this.changeStateSuccess);
        window.GlobalStorage.bind('widgets-updated-failed', this.changeStateFailed);
    },

    changeStateSuccess: function () {
        this.setState({activity: true});
    },

    changeStateFailed: function () {
        this.setState({activity: true});
    },

    _sendWidgetsToServer: function () {
        var storage = window.GlobalStorage.widgetsList;
        var url = '/bitrix/tools/weather_service/update_widgets.php';

        $.ajax({
            type: "POST",
            url: url,
            data: {
                widgets: storage
            },
            dataType: 'json',
            success: function () {
                console.log('success');
                AppDispatcher.dispatch({
                    eventName: 'widgets-updated-success',
                    newItem: data
                });
            }.bind(this),
            fail: function () {
                console.log('failed');
                AppDispatcher.dispatch({
                    eventName: 'widgets-updated-failed',
                    newItem: data
                });
            }.bind(this)
        });
    },

    _handleClick: function () {
        console.log('send form');

        this.setState({activity: false});
        this._sendWidgetsToServer();
    },

    render: function () {
        var className = 'inactive';
        if (this.state.activity) {
            className = 'active';
        }

        return (
            <div className={className}>
                <button onClick={this._handleClick}>Send</button>
            </div>
        );
    }
});

module.exports = FooterButtonDock;