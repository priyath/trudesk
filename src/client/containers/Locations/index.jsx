import React from 'react';
import { connect } from 'react-redux';
import GeoMap from 'components/GeoMap'
import PageTitle from "components/PageTitle";
import PageContent from "components/PageContent";

class LocationsContainer extends React.Component {
    componentDidMount () {
        console.log('location component mounted');
    }

    render () {

        return (
            <div>
                <PageTitle
                    title={'Locations'}
                />
                <PageContent padding={0} paddingBottom={0}>
                    <GeoMap/>
                </PageContent>
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
