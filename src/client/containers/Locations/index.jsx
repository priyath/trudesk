import React from 'react';
import { connect } from 'react-redux';
import GeoMap from 'components/GeoMap'
import PageTitle from "components/PageTitle";
import PageContent from "components/PageContent";
import axios from 'axios';
import {head, orderBy} from "lodash";
import Log from "../../logger";
import helpers from "lib/helpers";

class LocationsContainer extends React.Component {
    componentDidMount () {
        console.log('location component mounted');
        // axios
        //     .get(`/api/v1/tickets/type/${e.target.value}`)
        //     .then(res => {
        //         const type = res.data.type
        //         if (type && type.priorities) {
        //             this.priorities = orderBy(type.priorities, ['migrationNum'])
        //             this.selectedPriority = head(orderBy(type.priorities, ['migrationNum']))
        //                 ? head(orderBy(type.priorities, ['migrationNum']))._id
        //                 : ''
        //
        //             setTimeout(() => {
        //                 this.priorityLoader.classList.add('hide')
        //                 this.priorityWrapper.classList.remove('hide')
        //             }, 500)
        //         }
        //     })
        //     .catch(error => {
        //         this.priorityLoader.classList.add('hide')
        //         Log.error(error)
        //         helpers.UI.showSnackbar(`Error: ${error.response.data.error}`)
        //     })
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
