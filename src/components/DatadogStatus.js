import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { getDatadogStatus } from '../actions/datadogActions';

import IncidentUpdateFeed from './IncidentUpdateFeed';

class DatadogStatus extends Component {
  componentDidMount() {
    this.props.getDatadogStatus();
    this.interval = setInterval(() => this.props.getDatadogStatus(), 600000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { datadogIncidents } = this.props;
    //Selects first five incidents using slice(0, 5)
    const incidentItems = datadogIncidents.slice(0, 5).map(incident => (
      <div key={incident.id}>
        <div className="card">
          <div className="card-body">
            <h3>
              <Moment format="MMMM Do YYYY, h:mm a">
                {incident.created_at}
              </Moment>
            </h3>
            <h4 className="card-title" style={{ color: 'orange' }}>
              {incident.name}
            </h4>
            <IncidentUpdateFeed incidentUpdates={incident.incident_updates} />
          </div>
        </div>
      </div>
    ));

    return (
      <div>
        <h1 className="display-4 mb-2">Datadog Recent Incidents</h1>
        {incidentItems}
      </div>
    );
  }
}

DatadogStatus.propTypes = {
  datadogIncidents: PropTypes.array.isRequired,
  getDatadogStatus: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  datadogIncidents: state.datadog.datadogIncidents
});

export default connect(
  mapStateToProps,
  { getDatadogStatus }
)(DatadogStatus);
