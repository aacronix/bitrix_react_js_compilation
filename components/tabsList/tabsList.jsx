import React from 'react';
import TabContent from '../tabContent/tabContent.jsx';
import Tab from '../tab/tab.jsx';

var TabsList = React.createClass({
    componentDidMount: function () {
        window.GlobalStorage.bind('change', this.changeState);
    },

    changeState: function () {
        this.forceUpdate();
    },

    render: function () {
        var storage = window.GlobalStorage;

        return (
            <div className="tabs-wrapper">
                <div className="tab-list">
                    {window.GlobalStorage.widgetsList.map((element, i) => (
                        <Tab id={i} key={'tab_' + i}/>
                    ))}
                </div>
                <div className="content-list">
                    {window.GlobalStorage.widgetsList.map((element, i) => (
                        <TabContent id={i} key={'tab_content_' + i}/>
                    ))}
                </div>
            </div>
        );
    }
});

module.exports = TabsList;