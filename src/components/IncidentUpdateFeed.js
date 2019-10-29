import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

class IncidentUpdateFeed extends Component {
  render() {
    const { incidentUpdates } = this.props;
    const incidentUpdateItems = incidentUpdates.map(incidentUpdate => (
      <div key={incidentUpdate.id}>
        <p>
          <mark>
            {/* Instyle css to capitalize and highlight the incident status */}
            <b style={{ textTransform: 'capitalize' }}>
              {incidentUpdate.status}
            </b>
          </mark>{' '}
          - {incidentUpdate.body} <br></br>
          <Moment format="MMMM Do YYYY, h:mm a">
            {incidentUpdate.display_at}
          </Moment>
        </p>
      </div>
    ));

    return <div>{incidentUpdateItems}</div>;
  }
}

IncidentUpdateFeed.propTypes = {
  incidentUpdates: PropTypes.array.isRequired
};

export default IncidentUpdateFeed;
