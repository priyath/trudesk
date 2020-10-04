import React from 'react';
import PropTypes from 'prop-types';
import { compose, withProps, withStateHandlers, withHandlers } from 'recompose';
import {
    GoogleMap, Marker, InfoWindow, withGoogleMap, withScriptjs,
} from 'react-google-maps';
import { MarkerClusterer } from 'react-google-maps/lib/components/addons/MarkerClusterer';
//import silverMapStyle from './silverMapStyle.json';

//import data from './data.json';

const Map = compose(
    withProps({
        // create your api key
        googleMapURL: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCQXPcmy5m-eemsBHdCK-fS40kF8hbWPJM&v=3.'
            + 'exp&libraries=geometry,drawing,places',
        loadingElement: <div style={{ height: '100%' }} />,
        containerElement: <div className="map" style={{ height: '700px' }} />,
        mapElement: <div style={{ height: '100%' }} />,
    }),
    withStateHandlers(() => ({
            showInfoWindow: true,
        }),
        {
            setOnMarkerClick: ({ isOpen, infoIndex }) => (index) => ({
                isOpen: infoIndex !== index || !isOpen,
                infoIndex: index
            })
            // handleMouseOver: ({ isOpen }) => () => ({
            //     showInfoWindow: true,
            // }),
            // handleMouseExit: ({ isOpen }) => () => ({
            //     showInfoWindow: false,
            // }),
        }),
    withHandlers(
        {
            onMarkerClick: (props) => index => {
                const { setOnMarkerClick } = props;
                setOnMarkerClick(index);
                props.markerHandler(props.branchList[index]);
            }
        }
    ),
    withScriptjs,
    withGoogleMap,
)(props => (
    <GoogleMap

        defaultZoom={8}
        defaultCenter={{ lat: 7.738738, lng: 80.690157 }}
        defaultOptions={{
            //styles: silverMapStyle,
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
                    url: `${process.env.PUBLIC_URL}/img/map_markers/m1.png`,
                    height: 53,
                    width: 53,
                },
                {
                    url: `${process.env.PUBLIC_URL}/img/map_markers/m1.png`,
                    height: 56,
                    width: 56,
                },
                {
                    url: `${process.env.PUBLIC_URL}/img/map_markers/m1.png`,
                    height: 66,
                    width: 66,
                },
                {
                    url: `${process.env.PUBLIC_URL}/img/map_markers/m1.png`,
                    height: 78,
                    width: 78,
                },
                {
                    url: `${process.env.PUBLIC_URL}/img/map_markers/m1.png`,
                    height: 90,
                    width: 90,
                },
            ]}
        >
            {props.branchList.map((branch, index) => {
                return (
                    <Marker
                        idx={index}
                        key={index}
                        position={{ lat: branch.lat, lng: branch.lng }}
                        onClick={()=>{ props.onMarkerClick(index)} }
                        options={{icon: branch.alertCount > 0 ? `${process.env.PUBLIC_URL}/img/map_markers/red-marker.png`
                                : `${process.env.PUBLIC_URL}/img/map_markers/green-marker.png`}}
                    >
                        {props.isOpen && props.infoIndex === index && (
                            <InfoWindow>
                                <p style={{ color: 'black'}}>{branch.location}</p>
                            </InfoWindow>
                        )}</Marker>
                )})}
        </MarkerClusterer>
    </GoogleMap>
));

const GeoMap = () => {
    return (
            <div dir="ltr">
                <Map
                    markers=''
                    markerHandler={()=>{}}
                    branchList={[]}
                />
            </div>
    )};

GeoMap.propTypes = {
    t: PropTypes.func.isRequired,
};

export default GeoMap;
