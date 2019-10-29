import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getAzureStatus } from '../actions/azureActions';

class AzureStatus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      VMEASTUS: 'Working',
      VMEASTUS2: 'Working',
      VMNORTHEUROPE: 'Working',
      CSEASTUS: 'Working',
      CSEASTUS2: 'Working',
      CSNORTHEUROPE: 'Working',
      AFEASTUS: 'Working',
      AFEASTUS2: 'Working',
      AFNORTHEUROPE: 'Working'
    };
  }

  updateTableState = items => {
    if (Array.isArray(items) && items.length) {
      //Checking for Virtual Machines
      items.forEach(item => {
        if (item.categories[0] === 'Virtual Machines') {
          switch (item.categories[1]) {
            case 'EAST US':
              return this.setState({
                VMEASTUS: 'Not Available'
              });
            case 'EAST US 2':
              return this.setState({
                VMEASTUS2: 'Not Available'
              });
            case 'NORTH EUROPE':
              return this.setState({
                VMNORTHEUROPE: 'Not Available'
              });
            default:
              // do nothing;
              break;
          }
        }
        //Checking for cloud services
        if (item.categories[0] === 'Cloud Services') {
          switch (item.categories[1]) {
            case 'EAST US':
              return this.setState({
                CSEASTUS: 'Not Available'
              });
            case 'EAST US 2':
              return this.setState({
                CSEASTUS2: 'Not Available'
              });
            case 'NORTH EUROPE':
              return this.setState({
                CSNORTHEUROPE: 'Not Available'
              });
            default:
              // do nothing;
              break;
          }
        }
        //Checking for azure functions
        if (item.categories[0] === 'Azure Functions') {
          switch (item.categories[1]) {
            case 'EAST US':
              return this.setState({
                AFEASTUS: 'Not Available'
              });
            case 'EAST US 2':
              return this.setState({
                AFEASTUS2: 'Not Available'
              });
            case 'NORTH EUROPE':
              return this.setState({
                AFNORTHEUROPE: 'Not Available'
              });
            default:
              // do nothing;
              break;
          }
        }
      });
    }
  };

  componentDidMount() {
    this.props.getAzureStatus();
    //Setting interval to refresh make request to api every 10 mins and calls render function again when it receives props
    this.interval = setInterval(() => this.props.getAzureStatus(), 600000);
  }

  //Resets interval when component unmounts so it wont make api calls
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const items = this.props.azureStatus;
    this.updateTableState(items);

    //Info UI
    let azureInfoContent;
    if (Array.isArray(items) && items.length) {
      //array exists and is not empty
      azureInfoContent = <h2>There is problem with some services.</h2>;
    } else {
      azureInfoContent = <h2>All Azure Services are working fine</h2>;
    }

    //Table UI
    let azureInfoTable = (
      <div className="container">
        <table className="table table-bordered table-hover ">
          <thead>
            <tr>
              <th scope="col">Products & Services</th>
              <th scope="col">East US</th>
              <th scope="col">East US 2</th>
              <th scope="col">North Europe</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Virtual Machines</th>
              <td>{this.state.VMEASTUS}</td>
              <td>{this.state.VMEASTUS2}</td>
              <td>{this.state.VMNORTHEUROPE}</td>
            </tr>
            <tr>
              <th scope="row">Cloud Services</th>
              <td>{this.state.CSEASTUS}</td>
              <td>{this.state.CSEASTUS2}</td>
              <td>{this.state.CSNORTHEUROPE}</td>
            </tr>
            <tr>
              <th scope="row">Azure Functions</th>
              <td>{this.state.AFEASTUS}</td>
              <td>{this.state.AFEASTUS2}</td>
              <td>{this.state.AFNORTHEUROPE}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );

    return (
      <div>
        <h1 className="display-4 mb-2">Azure Status</h1>
        {azureInfoContent}
        {azureInfoTable}
      </div>
    );
  }
}

AzureStatus.propTypes = {
  azureStatus: PropTypes.array.isRequired,
  getAzureStatus: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  azureStatus: state.azure.azureStatus
});

export default connect(
  mapStateToProps,
  { getAzureStatus }
)(AzureStatus);
