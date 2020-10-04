import React from 'react';
import { connect } from 'react-redux';
import GeoMap from 'components/GeoMap'

class LocationsContainer extends React.Component {
    componentDidMount () {
        console.log('location component mounted');
    }

    render () {

        return (
            <div>
                <h1>Locations View</h1>
                <GeoMap/>
            </div>
        )
    }
}

LocationsContainer.propTypes = {
};

const mapStateToProps = state => ({
});

export default connect(
    mapStateToProps,
    {}
)(LocationsContainer)
