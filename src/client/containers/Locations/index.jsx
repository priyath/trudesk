import React from 'react';
import { connect } from 'react-redux';
import GeoMap from 'components/GeoMap'
import PageTitle from "components/PageTitle";
import PageContent from "components/PageContent";
import axios from 'axios';
import Log from "../../logger";
import helpers from "lib/helpers";
import SpinLoader from "components/SpinLoader";

class LocationsContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            groups: {},
            loaded: false,
        };
    }

    componentDidMount () {
        axios.get(`/api/v1/tickets/summary`)
            .then(res => {
                const groupTicketMap = res.data.groupTicketMap || {};
                let groups = [];

                for (let [key, value] of Object.entries(groupTicketMap)) {
                    groups.push(value.groupInfo);
                }

                this.setState({
                    groups: groups,
                    groupTicketMap,
                    loaded: true,
                });

            })
            .catch(error => {
                this.priorityLoader.classList.add('hide');
                Log.error(error);
                helpers.UI.showSnackbar(`Error: ${error.response.data.error}`);
            });
    }

    render () {

        let mapComp;

        if (this.state.loaded){
            mapComp = <GeoMap markers={this.state.groups}/>;
        } else {
            mapComp = <SpinLoader active={true} />;
        }

        return (
            <div>
                <PageTitle
                    title={'Locations'}
                />
                <PageContent padding={0} paddingBottom={0}>
                    <div className="uk-grid uk-margin-medium-bottom">
                        <div className="uk-width-2-3">
                            {mapComp}
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
