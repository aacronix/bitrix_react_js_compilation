import React from "react";
import GoogleMap from "google-map-react";

var GoogleMapComponent = React.createClass({
    getInitialState: function () {
        return {
            center: {
                latitude: 55.754734,
                longitude: 37.583314
            },
            zoom: 9
        };
    },

    _handleMapClick: function () {
        console.log('google map click');
    },

    render: function () {
        return (
            <div className="google-map geo-map">
                <GoogleMap
                    apiKey={window.appInformation.en.key}
                    defaultCenter={this.state.center}
                    defaultZoom={this.state.zoom}>
                </GoogleMap>
            </div>
        );
    }
});

module.exports = GoogleMapComponent;