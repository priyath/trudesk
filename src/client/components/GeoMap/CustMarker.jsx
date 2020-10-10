import React, { Component } from 'react';
import { Marker, InfoWindow } from 'react-google-maps';

class CustomMarker extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showInfoWindow: false
        };
    }

    handleMouseOver (e) {
        this.setState({
            showInfoWindow: true
        });
    }

    handleMouseExit (e) {
        this.setState({
            showInfoWindow: false
        });
    }

    render() {
        const { showInfoWindow } = this.state;
        const { coordinates, groupId, icon, name, onMarkerClick } = this.props;
        return (
            <Marker
                key={groupId}
                onClick={()=>{
                    onMarkerClick(groupId)}
                }
                position={{
                    lat: parseFloat(coordinates.latitude),
                    lng: parseFloat(coordinates.longitude)
                }}
                options={{icon: icon}}
                onMouseOver={this.handleMouseOver.bind(this)}
                onMouseOut={this.handleMouseExit.bind(this)}
            >
            {showInfoWindow && (
                <InfoWindow>
                    <h4>{name}</h4>
                </InfoWindow>
            )}
            </Marker>
        );
    }
}
export default CustomMarker;
