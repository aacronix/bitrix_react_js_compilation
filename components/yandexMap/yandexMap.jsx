import React from 'react';
import {Map, Marker, MarkerLayout} from 'yandex-map-react';

var YandexMap = React.createClass({
    getInitialState: function () {
        return {
            latitude: 55.754734,
            longitude: 37.583314
        };
    },

    componentDidMount: function () {
        window.Tabs.bind('change', this.changeState);
    },

    changeState: function () {
        this.forceUpdate();
    },

    handleChange: function (evt) {
    },

    handleMapClick: function (event) {
        var clickCoords = event.get('coords');
        AppDispatcher.dispatch({eventName: 'map-click', newItem: clickCoords});
    },

    render: function () {
        var store = window.Tabs;
        var objectPositionLat = store.tabsList[store.activeTabId].latitude;
        var objectPositionLon = store.tabsList[store.activeTabId].longitude;
        var mapCenterLat = this.state.latitude;
        var mapCenterLon = this.state.longitude;
        var marker;

        marker = <Marker lat={objectPositionLat} lon={objectPositionLon}>
            <MarkerLayout>
                <div style={markerStyles}>
                    <img src="../images/resized/pin-object-position.png"/>
                </div>
            </MarkerLayout>
        </Marker>;

        return <div className="yandex-map">
            <Map onClick={this.handleMapClick}
                 onAPIAvailable={function () { console.log('API loaded'); }}
                 width={'100%'}
                 state={mapState}
                 center={[mapCenterLat, mapCenterLon]}
                 zoom={10}>
                {marker}
            </Map>
        </div>
    }
});

const markerStyles = {
    width: '40px',
    height: '40px',
    background: 'transparent',
    borderRadius: '50%'
};

const mapState = {
    controls: [] //non controls
};

module.exports = YandexMap;