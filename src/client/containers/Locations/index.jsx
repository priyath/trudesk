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

    constructor(props) {
        super(props);
        this.state = {
            groups: []
        };
    }

    componentDidMount () {
        axios.get(`/api/v1/tickets/summary`)
            .then(res => {
                const data = res.data.tickets || [];

                const groups = data.map((el) => {
                    return el.group;
                }).filter((v,i,a)=>a.findIndex(t=>(t._id === v._id))===i);

                this.setState({
                    groups
                });

            })
            .catch(error => {
                this.priorityLoader.classList.add('hide');
                Log.error(error);
                helpers.UI.showSnackbar(`Error: ${error.response.data.error}`);
            });
    }

    render () {

        return (
            <div>
                <PageTitle
                    title={'Locations'}
                />
                <PageContent padding={0} paddingBottom={0}>
                    <div className="uk-grid uk-margin-medium-bottom">
                        <div className="uk-width-2-3">
                            <GeoMap markers={this.state.groups}/>
                        </div>
                    </div>
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
