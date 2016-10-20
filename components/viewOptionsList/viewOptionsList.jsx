'use strict';

import React from 'react';
import {SketchPicker} from 'react-color';
import reactCSS from 'reactcss'

var ViewOptionsList = React.createClass({
    componentDidMount: function () {
    },

    getInitialState: function () {
        return {
            provider: this.props.activeProvider,
            showColorBgPicker: false,
            showColorMajorTextPicker: false,
            showColorExtraTextPicker: false
        };
    },
    initialSelect: {
        ru: {
            20: "20 минут",
            30: "30 минут",
            60: "1 час",
            120: "2 часа",
            240: "6 часов"
        }
    },

    _handleUpdateIntervalChange: function (event) {
        AppDispatcher.dispatch({
            eventName: 'change-update-interval',
            newItem: [this.state.provider, event.target.value]
        });
    },

    _handleMeasurementSystemChange: function (event) {
        AppDispatcher.dispatch({
            eventName: 'change-measurement-system',
            newItem: [this.state.provider, event.target.value]
        });
    },

    _handleChangeBgColor: function (color) {
        AppDispatcher.dispatch({
            eventName: 'change-bg-color',
            newItem: [this.state.provider, "rgba(" + color.rgb.r + ", " + color.rgb.g + ", " + color.rgb.b + ", " + color.rgb.a + ")"]
        });
    },

    _handleChangeMajorTextColor: function (color) {
        AppDispatcher.dispatch({
            eventName: 'change-major-text-color',
            newItem: [this.state.provider, color.hex]
        });
    },

    _handleChangeExtraTextColor: function (color) {
        AppDispatcher.dispatch({
            eventName: 'change-extra-text-color',
            newItem: [this.state.provider, color.hex]
        });
    },

    _handleChangeBgColorPickerActivity: function () {
        this.setState({showColorBgPicker: !this.state.showColorBgPicker});
    },

    _handleChangeMajorTextColorPickerActivity: function () {
        this.setState({showColorMajorTextPicker: !this.state.showColorMajorTextPicker});
    },

    _handleChangeExtraTextColorPickerActivity: function () {
        this.setState({showColorExtraTextPicker: !this.state.showColorExtraTextPicker});
    },

    _handleTitleChange: function (event) {
        AppDispatcher.dispatch({
            eventName: 'change-widget-title',
            newItem: [this.state.provider, event.target.value]
        });
    },

    _handleChangeShowProviderInfo: function () {
        var widgetsList = window.GlobalStorage.widgetsList;

        AppDispatcher.dispatch({
            eventName: 'change-show-provider-info',
            newItem: [this.state.provider, !widgetsList[this.state.provider].options.show_provider_info]
        });
    },

    _handleWidgetNameChange: function (event) {
        AppDispatcher.dispatch({
            eventName: 'change-widget-name',
            newItem: [this.state.provider, event.target.value]
        });
    },

    _handleDeleteWidgetButtonClick: function () {
        AppDispatcher.dispatch({
            eventName: 'delete-widget',
            newItem: [this.state.provider, null]
        });

        this.forceUpdate();
    },

    render: function () {
        var storage = window.GlobalStorage.widgetsList;

        var activeWidget = this.state.provider;
        var information = storage[activeWidget].options.information;


        const styles = reactCSS({
            'default': {
                bgColor: {
                    width: '36px',
                    height: '14px',
                    borderRadius: '2px',
                    background: information.background_color
                },
                majorTextColor: {
                    width: '36px',
                    height: '14px',
                    borderRadius: '2px',
                    background: information.major_text_color
                },
                extraTextColor: {
                    width: '36px',
                    height: '14px',
                    borderRadius: '2px',
                    background: information.extra_text_color
                },
                swatch: {
                    padding: '5px',
                    background: '#fff',
                    borderRadius: '1px',
                    boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
                    display: 'inline-block',
                    cursor: 'pointer'
                },
                popover: {
                    position: 'absolute',
                    zIndex: '2'
                },
                cover: {
                    position: 'fixed',
                    top: '0px',
                    right: '0px',
                    bottom: '0px',
                    left: '0px'
                }
            }
        });

        var deletePermission = <div className="line clearfix">
            <input type="button" name="delete_widget" value="Удалить виджет" onClick={this._handleDeleteWidgetButtonClick}/>
        </div>;

        if (storage[activeWidget].widget.super){
            deletePermission = '';
        }

        return (
            <div className="view-options b-option">
                <p className="title">Настройка отображения</p>
                <div className="line clearfix">
                    <p className="label">Заголовок виджета</p>
                    <input type="text" name="widget_title" value={information.widget_title} onChange={this._handleTitleChange}/>
                </div>
                <div className="line clearfix">
                    <p className="label">Интервал обновления</p>
                    <select onChange={this._handleUpdateIntervalChange} value={information.update_interval}>
                        <option value='30'>30 минут</option>
                        <option value='60'>1 час</option>
                        <option value='120'>2 часа</option>
                        <option value='360'>6 часов</option>
                    </select>
                </div>
                <div className="line clearfix">
                    <p className="label">Система измерений</p>
                    <select onChange={this._handleMeasurementSystemChange}
                            value={information.measurement_system}>
                        <option value="metrical">Метрическая</option>
                        <option value="britain">Британская</option>
                    </select>
                </div>
                <div className="line clearfix">
                    <p className="label">Цвет заднего фона</p>
                    <div style={ styles.swatch } onClick={ this._handleChangeBgColorPickerActivity }>
                        <div style={ styles.bgColor }/>
                    </div>
                    { this.state.showColorBgPicker ? <div style={ styles.popover }>
                        <div style={ styles.cover } onClick={ this._handleChangeBgColorPickerActivity }/>
                        <SketchPicker color={ information.background_color }
                                      onChange={ this._handleChangeBgColor }/>
                    </div> : null }
                </div>
                <div className="line clearfix">
                    <p className="label">Цвет основного текста</p>
                    <div style={ styles.swatch } onClick={ this._handleChangeMajorTextColorPickerActivity }>
                        <div style={ styles.majorTextColor }/>
                    </div>
                    { this.state.showColorMajorTextPicker ? <div style={ styles.popover }>
                        <div style={ styles.cover } onClick={ this._handleChangeMajorTextColorPickerActivity }/>
                        <SketchPicker disableAlpha={true} color={ information.major_text_color }
                                      onChange={ this._handleChangeMajorTextColor }/>
                    </div> : null }
                </div>
                <div className="line clearfix">
                    <p className="label">Цвет дополнительного текста</p>
                    <div style={ styles.swatch } onClick={ this._handleChangeExtraTextColorPickerActivity }>
                        <div style={ styles.extraTextColor }/>
                    </div>
                    { this.state.showColorExtraTextPicker ? <div style={ styles.popover }>
                        <div style={ styles.cover } onClick={ this._handleChangeExtraTextColorPickerActivity }/>
                        <SketchPicker disableAlpha={true} color={ information.extra_text_color }
                                      onChange={ this._handleChangeExtraTextColor }/>
                    </div> : null }
                </div>
                <div className="line clearfix">
                    <p className="label">Показывать провайдера на виджете?</p>
                    <input type="checkbox" name="show_provider_info" checked={information.show_provider_info} onChange={this._handleChangeShowProviderInfo}/>
                </div>
                <div className="line clearfix">
                    <p className="label">Название виджета</p>
                    <input type="text" name="widget_name" value={storage[activeWidget].widget.name} onChange={this._handleWidgetNameChange}/>
                </div>
                {deletePermission}
            </div>
        );
    }
});

module.exports = ViewOptionsList;