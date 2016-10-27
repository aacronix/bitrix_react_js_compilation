'use strict';

import React from "react";
import {SketchPicker} from "react-color";
import reactCSS from "reactcss";
import InputField from "../inputField/inputField.jsx";
import CheckBoxField from "../checkBoxField/checkBoxField.jsx";
import DropDownUpdateTimeField from "../dropDownUpdateTimeField/dropDownUpdateTimeTime.jsx";
import DropDownMeasurementSystemField from "../dropDownMeasurementSystemField/dropDownMeasurementSystemField.jsx";
import PreviewManager from "../previewManager/previewManager.jsx";

var ViewOptionsList = React.createClass({
    getInitialState: function () {
        return {
            provider: this.props.activeProvider,
            showColorBgPicker: false,
            showColorMajorTextPicker: false,
            showColorExtraTextPicker: false,
            showBorderColorPicker: false
        };
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

    _handleChangeBorderColor: function (color) {
        AppDispatcher.dispatch({
            eventName: 'change-border-color',
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

    _handleChangeBorderColorPickerActivity: function () {
        this.setState({showBorderColorPicker: !this.state.showBorderColorPicker});
    },

    _handleTitleChange: function (event) {
        AppDispatcher.dispatch({
            eventName: 'change-widget-title',
            newItem: [this.state.provider, event.target.value]
        });
    },

    _handleDeleteWidgetButtonClick: function () {
        var storage = window.GlobalStorage.widgetsList;
        var activeWidget = this.state.provider;
        var id = storage[activeWidget].widget.widget_id;

        this._deleteWidget(id);
    },

    _deleteWidget: function (id) {
        var url = '/bitrix/tools/weather_service/delete_widget.php';

        $.ajax({
            type: "POST",
            url: url,
            dataType: 'json',
            data: {
                id: id
            },
            success: function () {
                AppDispatcher.dispatch({
                    eventName: 'delete-widget',
                    newItem: null
                });
            }
        });
    },

    render: function () {
        var storage = window.GlobalStorage.widgetsList;

        var activeWidget = this.state.provider;
        var information = storage[activeWidget].options.information;
        var widget = storage[activeWidget].widget;


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
                borderColor: {
                    width: '36px',
                    height: '14px',
                    borderRadius: '2px',
                    background: information.border_color
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
                    zIndex: '200',
                    top: 0,
                    right: 0
                },
                cover: {
                    position: 'fixed',
                    top: '0px',
                    right: '0px',
                    bottom: '0px',
                    left: '0px',
                    zIndex: '100',
                },
                picker: {
                    zIndex: '1000'
                }
            }
        });

        var deletePermission = <div className="line clearfix">
            <input type="button" name="delete_widget" value="Удалить виджет"
                   onClick={this._handleDeleteWidgetButtonClick}/>
        </div>;

        // TODO: какая-то хэ с БД, а именно с bool
        if (storage[activeWidget].widget.super == "1") {
            deletePermission = '';
        }

        return (
            <div className="view-options b-option">
                <p className="title">Настройка отображения</p>
                <div className="line clearfix">
                    <p className="label">Заголовок виджета</p>
                    <input type="text" name="widget_title" value={information.widget_title}
                           onChange={this._handleTitleChange}/>
                </div>
                <DropDownUpdateTimeField provider={activeWidget} name='Интервал обновления'/>
                <DropDownMeasurementSystemField provider={activeWidget} name='Система измерений'/>
                <div className="line clearfix">
                    <p className="label">Цвет заднего фона</p>
                    <div style={ styles.swatch } onClick={ this._handleChangeBgColorPickerActivity }>
                        <div style={ styles.bgColor }/>
                    </div>
                    { this.state.showColorBgPicker ? <div style={ styles.popover }>
                        <div style={ styles.cover } onClick={ this._handleChangeBgColorPickerActivity }/>
                        <SketchPicker color={ information.background_color }
                                      onChange={ this._handleChangeBgColor }
                                      presetColors={colorPreset}
                                      style={ styles.picker }/>
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
                                      onChange={ this._handleChangeMajorTextColor }
                                      presetColors={colorPreset}
                                      style={ styles.picker }/>
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
                                      onChange={ this._handleChangeExtraTextColor }
                                      presetColors={colorPreset}
                                      style={ styles.picker }/>
                    </div> : null }
                </div>
                <div className="line clearfix">
                    <p className="label">Цвет границ виджета</p>
                    <div style={ styles.swatch } onClick={ this._handleChangeBorderColorPickerActivity }>
                        <div style={ styles.borderColor }/>
                    </div>
                    { this.state.showBorderColorPicker ? <div style={ styles.popover }>
                        <div style={ styles.cover } onClick={ this._handleChangeBorderColorPickerActivity }/>
                        <SketchPicker disableAlpha={true} color={ information.border_color }
                                      onChange={ this._handleChangeBorderColor }
                                      presetColors={colorPreset}
                                      style={ styles.picker }/>
                    </div> : null }
                </div>
                <CheckBoxField provider={activeWidget} name='Показывать провайдера на виджете?'/>
                <InputField provider={activeWidget} name='Название виджета'/>
                {deletePermission}
                <PreviewManager templateName={widget.template_name}/>
            </div>
        );
    }
});

var colorPreset = [
    '#1abc9c',
    '#2ecc71',
    '#3498db',
    '#9b59b6',
    '#34495e',
    '#16a085',
    '#27ae60',
    '#2980b9',
    '#8e44ad',
    '#2c3e50',
    '#f1c40f',
    '#e67e22',
    '#e74c3c',
    '#ecf0f1',
    '#95a5a6',
    '#f39c12',
    '#d35400',
    '#c0392b',
    '#bdc3c7',
    '#7f8c8d'
]

module.exports = ViewOptionsList;