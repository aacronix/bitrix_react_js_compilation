import React from 'react';
import {Map, Marker, MarkerLayout} from 'yandex-map-react';

var YandexMap = React.createClass({
    getInitialState: function () {
        return {
            latitude: 55.754734,
            longitude: 37.583314
        };
    },

    _handleMapClick: function (event) {
        var clickCoords = event.get('coords');
        AppDispatcher.dispatch({eventName: 'map-click', newItem: clickCoords});
    },

    render: function () {
        var storage = window.GlobalStorage;
        var objectPositionLat = storage.widgetsList[storage.activeTabId].options.information.latitude;
        var objectPositionLon = storage.widgetsList[storage.activeTabId].options.information.longitude;
        var mapCenterLat = this.state.latitude;
        var mapCenterLon = this.state.longitude;
        var marker;

        marker = <Marker lat={objectPositionLat} lon={objectPositionLon}>
            <MarkerLayout>
                <div style={markerStyles}>
                    <img src="/react/images/resized/pin-object-position.png"/>
                </div>
            </MarkerLayout>
        </Marker>;

        return <div className="yandex-map geo-map" style={{width: 100 + '%'}}>
            <Map onClick={this._handleMapClick}
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