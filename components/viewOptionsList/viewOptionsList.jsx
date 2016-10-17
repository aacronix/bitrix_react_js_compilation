'use strict';

import React from 'react';
import {SketchPicker} from 'react-color';
import reactCSS from 'reactcss'

var ViewOptionsList = React.createClass({
    componentDidMount: function () {
        console.log(window.Tabs.tabsList);
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

    handleUpdateIntervalChange: function (event) {
        AppDispatcher.dispatch({
            eventName: 'change-update-interval',
            newItem: [this.state.provider, event.target.value]
        });
    },

    handleMeasurementSystemChange: function (event) {
        AppDispatcher.dispatch({
            eventName: 'change-measurement-system',
            newItem: [this.state.provider, event.target.value]
        });
    },

    handleChangeBgColor: function (color) {
        AppDispatcher.dispatch({
            eventName: 'change-bg-color',
            newItem: [this.state.provider, "rgba(" + color.rgb.r + ", " + color.rgb.g + ", " + color.rgb.b + ", " + color.rgb.a + ")"]
        });
    },

    handleChangeMajorTextColor: function (color) {
        AppDispatcher.dispatch({
            eventName: 'change-major-text-color',
            newItem: [this.state.provider, color.hex]
        });
    },

    handleChangeExtraTextColor: function (color) {
        AppDispatcher.dispatch({
            eventName: 'change-extra-text-color',
            newItem: [this.state.provider, color.hex]
        });
    },

    handleChangeBgColorPickerActivity: function () {
        this.setState({showColorBgPicker: !this.state.showColorBgPicker});
    },

    handleChangeMajorTextColorPickerActivity: function () {
        this.setState({showColorMajorTextPicker: !this.state.showColorMajorTextPicker});
    },

    handleChangeExtraTextColorPickerActivity: function () {
        this.setState({showColorExtraTextPicker: !this.state.showColorExtraTextPicker});
    },

    handleTitleChange: function (event) {
        AppDispatcher.dispatch({
            eventName: 'change-widget-title',
            newItem: [this.state.provider, event.target.value]
        });
    },

    handleChangeShowProviderInfo: function () {
        var storage = window.Tabs.tabsList;

        AppDispatcher.dispatch({
            eventName: 'change-show-provider-info',
            newItem: [this.state.provider, !storage[this.state.provider].show_provider_info]
        });
    },

    handleNameChange: function (event) {
        AppDispatcher.dispatch({
            eventName: 'change-widget-name',
            newItem: [this.state.provider, event.target.value]
        });
    },

    handleDeleteWidgetButtonClick: function () {
        AppDispatcher.dispatch({
            eventName: 'delete-widget',
            newItem: [this.state.provider, null]
        });
        
        this.forceUpdate();
    },

    render: function () {
        var storage = window.Tabs.tabsList;

        var _this = this;
        var props = this.props;
        var activeProvider = this.state.provider;

        const styles = reactCSS({
            'default': {
                bgColor: {
                    width: '36px',
                    height: '14px',
                    borderRadius: '2px',
                    background: storage[activeProvider].background_color
                },
                majorTextColor: {
                    width: '36px',
                    height: '14px',
                    borderRadius: '2px',
                    background: storage[activeProvider].major_text_color
                },
                extraTextColor: {
                    width: '36px',
                    height: '14px',
                    borderRadius: '2px',
                    background: storage[activeProvider].extra_text_color
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
            <input type="button" name="delete_widget" value="Удалить виджет" onClick={this.handleDeleteWidgetButtonClick}/>
        </div>;

        if (storage[activeProvider].super){
            deletePermission = '';
        }

        return (
            <div className="view-options b-option">
                <p className="title">Настройка отображения</p>
                <div className="line clearfix">
                    <p className="label">Заголовок виджета</p>
                    <input type="text" name="widget_title" value={storage[activeProvider].widget_title} onChange={this.handleTitleChange}/>
                </div>
                <div className="line clearfix">
                    <p className="label">Интервал обновления</p>
                    <select onChange={this.handleUpdateIntervalChange} value={storage[activeProvider].update_interval}>
                        <option value='30'>30 минут</option>
                        <option value='60'>1 час</option>
                        <option value='120'>2 часа</option>
                        <option value='360'>6 часов</option>
                    </select>
                </div>
                <div className="line clearfix">
                    <p className="label">Система измерений</p>
                    <select onChange={this.handleMeasurementSystemChange}
                            value={storage[activeProvider].measurement_system}>
                        <option value="metrical">Метрическая</option>
                        <option value="britain">Британская</option>
                    </select>
                </div>
                <div className="line clearfix">
                    <p className="label">Цвет заднего фона</p>
                    <div style={ styles.swatch } onClick={ this.handleChangeBgColorPickerActivity }>
                        <div style={ styles.bgColor }/>
                    </div>
                    { this.state.showColorBgPicker ? <div style={ styles.popover }>
                        <div style={ styles.cover } onClick={ this.handleChangeBgColorPickerActivity }/>
                        <SketchPicker color={ storage[activeProvider].background_color }
                                      onChange={ this.handleChangeBgColor }/>
                    </div> : null }
                </div>
                <div className="line clearfix">
                    <p className="label">Цвет основного текста</p>
                    <div style={ styles.swatch } onClick={ this.handleChangeMajorTextColorPickerActivity }>
                        <div style={ styles.majorTextColor }/>
                    </div>
                    { this.state.showColorMajorTextPicker ? <div style={ styles.popover }>
                        <div style={ styles.cover } onClick={ this.handleChangeMajorTextColorPickerActivity }/>
                        <SketchPicker disableAlpha={true} color={ storage[activeProvider].major_text_color }
                                      onChange={ this.handleChangeMajorTextColor }/>
                    </div> : null }
                </div>
                <div className="line clearfix">
                    <p className="label">Цвет дополнительного текста</p>
                    <div style={ styles.swatch } onClick={ this.handleChangeExtraTextColorPickerActivity }>
                        <div style={ styles.extraTextColor }/>
                    </div>
                    { this.state.showColorExtraTextPicker ? <div style={ styles.popover }>
                        <div style={ styles.cover } onClick={ this.handleChangeExtraTextColorPickerActivity }/>
                        <SketchPicker disableAlpha={true} color={ storage[activeProvider].extra_text_color }
                                      onChange={ this.handleChangeExtraTextColor }/>
                    </div> : null }
                </div>
                <div className="line clearfix">
                    <p className="label">Показывать провайдера на виджете?</p>
                    <input type="checkbox" name="show_provider_info" checked={storage[activeProvider].show_provider_info} onChange={this.handleChangeShowProviderInfo}/>
                </div>
                <div className="line clearfix">
                    <p className="label">Название виджета</p>
                    <input type="text" name="widget_name" value={storage[activeProvider].widget_name} onChange={this.handleNameChange}/>
                </div>
                {deletePermission}
            </div>
        );
    }
});

module.exports = ViewOptionsList;