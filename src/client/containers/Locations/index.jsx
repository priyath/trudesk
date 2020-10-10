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
            ticketSummary: {
                totalCount: 0,
                closed: 0,
                newT: 0,
                inProgress: 0,
                ready: 0,
                overdue: 0,
            }
        };
    }

    componentDidMount () {
        axios.get(`/api/v1/tickets/summary`)
            .then(res => {
                const groupTicketMap = res.data.groupTicketMap || {};
                let groups = [];

                let closed = 0;
                let newT = 0;
                let inProgress = 0;
                let ready = 0;
                let overdue = 0;

                for (let [key, value] of Object.entries(groupTicketMap)) {
                    groups.push(value.groupInfo);

                    const tickets = value.tickets;

                    tickets.forEach(ticket => {
                        const status = ticket.status;

                        if (status === 0){
                            newT += 1;
                        } else if (status === 1) {
                            inProgress += 1;
                        } else if (status === 2) {
                            ready += 1;
                        } else if (status === 3) {
                            closed += 1;
                        }

                        if (ticket.isOverdue) {
                            overdue += 1;
                        }

                    });
                }

                this.setState({
                    groups: groups,
                    groupTicketMap,
                    loaded: true,
                    ticketSummary: {
                        totalCount: (closed + newT + inProgress + ready),
                        closed,
                        newT,
                        inProgress,
                        ready,
                        overdue,
                    }

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
                        <div className="uk-width-1-3">
                            <table className="uk-table">
                                <caption>Ticket Summary</caption>
                                <thead>
                                <tr>
                                    <th className="uk-text-nowrap">Stat</th>
                                    <th className="uk-text-nowrap uk-text-right">Value</th>
                                </tr>
                                </thead>
                                <tbody>

                                <tr className="uk-table-middle">
                                    <td className="uk-width-6-10 uk-text-nowrap uk-text-muted uk-text-small">Total
                                        tickets:
                                    </td>
                                    <td id="mostRequester" className="uk-width-4-10 uk-text-right  uk-text-small">{
                                        this.state.ticketSummary.totalCount}
                                    </td>
                                </tr>

                                <tr className="uk-table-middle">
                                    <td className="uk-width-6-10 uk-text-nowrap uk-text-muted uk-text-small">Ready/closed
                                        tickets:
                                    </td>
                                    <td id="mostCommenter" className="uk-width-4-10 uk-text-right  uk-text-small">{
                                        this.state.ticketSummary.ready + this.state.ticketSummary.closed
                                    }
                                    </td>
                                </tr>

                                <tr className="uk-table-middle">
                                    <td className="uk-width-6-10 uk-text-nowrap uk-text-muted uk-text-small">New/In progress tickets:
                                    </td>
                                    <td id="mostAssignee" className="uk-width-4-10 uk-text-right  uk-text-small">{
                                        this.state.ticketSummary.newT + this.state.ticketSummary.inProgress
                                    }</td>
                                </tr>

                                <tr className="uk-table-middle">
                                    <td className="uk-width-6-10 uk-text-nowrap uk-text-muted uk-text-small">SLA
                                        exceeded tickets:
                                    </td>
                                    <td className="uk-width-4-10 uk-text-right  uk-text-small">
                                        {
                                            this.state.ticketSummary.overdue
                                        }
                                    </td>
                                </tr>

                                </tbody>
                            </table>
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
