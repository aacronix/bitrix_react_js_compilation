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
                    newItem: null
                });
                this.setState({activity: true});
            }.bind(this),
            fail: function () {
                console.log('failed');
                AppDispatcher.dispatch({
                    eventName: 'widgets-updated-failed',
                    newItem: null
                });
                this.setState({activity: true});
            }.bind(this)
        });
    },

    _handleClick: function () {
        var storage = window.GlobalStorage;
        var widgets = storage.widgetsList;

        var previouslyHash = storage.dataHash;
        var currentHash = JSON.stringify(widgets).hashCode();
        
        console.log(previouslyHash);
        console.log(currentHash);

        if (previouslyHash != currentHash) {
            console.log('send form');

            this.setState({activity: false});
            this._sendWidgetsToServer();
        } else {
            console.log('data don\'t changed');
        }
    },

    render: function () {
        var className = 'inactive';
        if (this.state.activity) {
            className = 'active';
        }

        return (
            <div className={className}>
                <button onClick={this._handleClick} disabled={!this.state.activity}>Send</button>
            </div>
        );
    }
});

module.exports = FooterButtonDock;