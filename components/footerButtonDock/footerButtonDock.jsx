'use strict';

import React from 'react';

var FooterButtonDock = React.createClass({
    getInitialState: function () {
        return {
            activity: true
        }
    },

    componentDidMount: function () {
        window.GlobalStorage.bind('widgets-updated-success', this._changeStateSuccess);
        window.GlobalStorage.bind('widgets-updated-failed', this._changeStateFailed);
    },

    _changeStateSuccess: function () {
        this.setState({activity: true});
    },

    _changeStateFailed: function () {
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
            }.bind(this),
            fail: function () {
                console.log('failed');
                AppDispatcher.dispatch({
                    eventName: 'widgets-updated-failed',
                    newItem: null
                });
            }.bind(this)
        });
    },

    _handleClick: function () {
        var storage = window.GlobalStorage;
        var widgets = storage.widgetsList;

        var previouslyHash = storage.dataHash;
        var currentHash = JSON.stringify(widgets).hashCode();

        if (previouslyHash != currentHash) {

            AppDispatcher.dispatch({
                eventName: 'data-validation',
                newItem: null
            });

            if (storage.globalValid) {
                this.setState({activity: false});
                this._sendWidgetsToServer();
            } else {
                AppDispatcher.dispatch({
                    eventName: 'form-has-errors',
                    newItem: null
                });
            }
        } else {
            AppDispatcher.dispatch({
                eventName: 'data-not-changed',
                newItem: null
            });
        }
    },

    render: function () {
        var storage = window.GlobalStorage;

        var className = 'inactive';
        if (!storage.dataInAction) {
            className = 'active';
        }

        return (
            <div className={'footer-button-dock ' + className}>
                <button onClick={this._handleClick} disabled={storage.dataInAction}>Send</button>
            </div>
        );
    }
});

module.exports = FooterButtonDock;