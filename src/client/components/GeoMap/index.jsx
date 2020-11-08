import React from 'react';
//import PropTypes from 'prop-types';
//import { compose, withProps, withStateHandlers, withHandlers } from 'recompose';
import {
    GoogleMap, Marker, InfoWindow, withGoogleMap, withScriptjs,
} from 'react-google-maps';
import { MarkerClusterer } from 'react-google-maps/lib/components/addons/MarkerClusterer';
import silverMapStyle from './silverMapStyle.json';
import CustMarker from './CustMarker';

//import data from './data.json';

const Map = ({ markers, onMarkerClick }) => {
    return (
        <GoogleMap
            defaultZoom={7.5}
            defaultCenter={{ lat: 7.738738, lng: 80.690157 }}
            defaultOptions={{
                styles: silverMapStyle,
                streetViewControl: false,
                fullscreenControl: false,
                mapTypeControl: false,
            }}
        >
            <MarkerClusterer
                averageCenter
                enableRetinaIcons
                gridSize={60}
                styles={[
                    {
                        url: `/img/map_markers/m1.png`,
                        height: 53,
                        width: 53,
                    },
                    {
                        url: `/img/map_markers/m1.png`,
                        height: 56,
                        width: 56,
                    },
                    {
                        url: `/img/map_markers/m1.png`,
                        height: 66,
                        width: 66,
                    },
                    {
                        url: `/img/map_markers/m1.png`,
                        height: 78,
                        width: 78,
                    },
                    {
                        url: `/img/map_markers/m1.png`,
                        height: 90,
                        width: 90,
                    },
                ]}
            >
                {
                    markers.map((group) => {
                        const coordinates = group.coordinates;
                        if (coordinates) {
                            let icon = `/img/map_markers/green-marker.png`;
                            if (group.overdueTickets){
                                icon = `/img/map_markers/red-marker.png`;
                            } else if (group.openOrInProgressTickets) {
                                icon = `/img/map_markers/yellow-marker.png`;
                            }
                            return (
                                <CustMarker
                                    icon={icon}
                                    coordinates={coordinates}
                                    key={group._id}
                                    groupId={group._id}
                                    name={group.name}
                                    onMarkerClick={onMarkerClick}
                                />
                            )
                        }
                    })
                }
            </MarkerClusterer>
        </GoogleMap>
    );
};

const WrappedMap = withScriptjs(withGoogleMap(props => <Map {...props}/>));

export default ({ markers, onMarkerClick }) => {
    return (
        <div style={{height: `calc(100vh - 150px)` }}>
            <WrappedMap
                googleMapURL={'https://maps.googleapis.com/maps/api/js?key=AIzaSyCQXPcmy5m-eemsBHdCK-fS40kF8hbWPJM&v=3.'
                + 'exp&libraries=geometry,drawing,places'}
                loadingElement={<div style={{ height: '100%' }} />}
                containerElement={<div className="map" style={{ height: '100%' }} />}
                mapElement={<div style={{ height: '100%' }} />}
                markers={markers}
                onMarkerClick={onMarkerClick}
            />
        </div>
    )
};
