import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Landing extends Component {
  render() {
    return (
      <React.Fragment>
        <h1 className="display-4 mb-2">
          <span className="text-danger">StatusPage</span> List
        </h1>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <Link to="/azure" className="nav-link">
              <h2>
                <i className="fas fa-arrow-circle-right" /> Azure
              </h2>
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/datadog" className="nav-link">
              <h2>
                <i className="fas fa-arrow-circle-right" /> Datadog
              </h2>
            </Link>
          </li>
        </ul>
      </React.Fragment>
    );
  }
}

export default Landing;
