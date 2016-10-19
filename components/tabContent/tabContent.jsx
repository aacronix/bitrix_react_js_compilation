'use strict';

import React from 'react';
import ProviderList from '../providerList/providerList.jsx';
import ViewOptionsList from '../viewOptionsList/viewOptionsList.jsx';

var TabContent = React.createClass({
    getInitialState: function () {
        return{
            id: this.props.id
        }
    },

    render: function () {
        var storage = window.Tabs;
        var widget = window.Tabs.tabsList[this.state.id];
        var id = this.state.id;

        var activeClass = (storage.activeTabId === id ? 'active' : '');
        
        return(
            <div className={activeClass + ' tab-content clearfix'}>
                <ProviderList key={'tab_content_' + id} widgetId={id}/>
                <ViewOptionsList activeProvider={id}/>
            </div>
        );
    }
});

module.exports = TabContent;