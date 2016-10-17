import React from 'react';

var TextInput = React.createClass({
    getDefaultProps: function () {
        return {
            name: 'Field',
            formns: 'form_event'
        };
    },
    getInitialState: function () {
        return {
            // значение задается в родительском классе, либо берется пустое
            value: this.props.value || '',
            error: null
        };
    },
    componentWillMount: function () {
        // подписываемся на события
        // FormBus.Input.attachField.bind(this)();
    },
    componentWillUnmount: function () {
        // отписываемся от событий
        // FormBus.Input.detachField.bind(this)();
    },
    setValue: function (e) {
        var component = this;
        this.setState({
            value: e.currentTarget.value
        }, function () {
            // отправляем событие об изменении значения
            // FormBus.Input.updateField.bind(component)();
        });
    },
    render: function () {

        var error = this.state.error ? (
            <span id="name-error" className="error">{this.state.error}</span>
        ) : null;

        return (
            <div className="form-group">
                <label className="control-label">
                    {this.props.name}
                    {error}
                </label>
                <input name={this.props.name} type="text" className="form-control" onChange={this.setValue} value={this.state.value} />
            </div>
        );
    }
});

module.exports = TextInput;