'use strict';

import React from 'react';
import ProviderList from '../providerList/providerList.jsx';
import ViewOptionsList from '../viewOptionsList/viewOptionsList.jsx';

var TabContent = React.createClass({
    getInitialState: function () {
        return{
            id: this.props.id,
            DomId: ('tab_content_' + this.props.id)
        }
    },

    componentDidMount: function () {
        window.GlobalStorage.bind('change', this.changeState);
    },

    changeState: function () {
        this.forceUpdate();
    },

    render: function () {
        var storage = window.GlobalStorage;
        var id = this.state.id;

        var activeClass = (storage.activeTabId === id ? 'active' : '');
        
        return(
            <div id={'tab_content_' + id} className={activeClass + ' tab-content clearfix'}>
                <ProviderList key={'tab_content_' + id} widgetId={id}/>
                <ViewOptionsList activeProvider={id}/>
            </div>
        );
    }
});

module.exports = TabContent;