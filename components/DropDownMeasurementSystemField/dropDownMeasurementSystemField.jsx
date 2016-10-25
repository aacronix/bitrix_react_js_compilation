'use strict';

import React from 'react';

var DropDownMeasurementSystemField = React.createClass({
    getInitialState: function () {
        return {
            provider: this.props.provider,
            name: this.props.name
        }
    },

    _handleMeasurementSystemChange: function (event) {
        AppDispatcher.dispatch({
            eventName: 'change-measurement-system',
            newItem: [this.state.provider, event.target.value]
        });
    },

    render: function () {
        var storage = window.GlobalStorage.widgetsList;

        var activeWidget = this.state.provider;
        var information = storage[activeWidget].options.information;

        return (
            <div className="line clearfix">
                <p className="label">{this.state.name}</p>
                <select onChange={this._handleMeasurementSystemChange}
                        value={information.measurement_system}>
                    <option value="metrical">Метрическая</option>
                    <option value="britain">Британская</option>
                </select>
            </div>
        );
    }
});

module.exports = DropDownMeasurementSystemField;
