import React from 'react';

class Airport extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            icao: '',
            airportName: '',
            availRunways: {},
            lat: 0,
            long: 0
        };
      }

      // fetching data and setting state on app load
      componentDidMount() {
        fetch(`http://localhost:3000/airports/${this.props.currentLocation}.json`)
        .then(res => res.json())
        .then(data => this.setState({
            icao: data.icao,
            airportName: data.name,
            availRunways: data.runways,
            lat: data.latitude,
            long: data.longitude
        }));
    }

    // fetching data and resetting state when the dom changes
    componentDidUpdate() {
        fetch(`http://localhost:3000/airports/${this.props.currentLocation}.json`)
        .then(res => res.json())
        .then(data => this.setState({
            icao: data.icao,
            airportName: data.name,
            availRunways: data.runways,
            lat: data.latitude,
            long: data.longitude
        }));
    }

    render() {
        let runwayIdents = [];
        for (let i=0; i < this.state.availRunways.length; i++) {
            if (this.state.availRunways[i].approachSlopeIndicatorBaseAvailable === true && 
                this.state.availRunways[i].approachSlopeIndicatorRecipAvailable === true &&
                this.state.availRunways[i].approachLightingSystemBaseAvailable === true &&
                this.state.availRunways[i].approachLightingSystemRecipAvailable === true) {
                    runwayIdents.push(JSON.stringify(this.state.availRunways[i].ident));
                }
        }
        
        return <div className="sub-component">
            <h2>Airport Information</h2>
            <p>Identifier: {this.state.icao === null ? 'N/A' : this.state.icao}</p>
            <p>Airport: {this.state.airportName}</p>
            <ul>
                Available Runways: 
                {runwayIdents.length > 0 ? runwayIdents.map(item => <li key={item}>{item}</li>) : ' No runways currently available'}
            </ul>
            <p>Latitude: {this.state.lat}</p>
            <p>Longitude: {this.state.long}</p>
        </div>
    }
  }

export default Airport;