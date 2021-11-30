import React from 'react';
import Airports from './components/airports';
import Weather from './components/weather';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      identifiers: ['egll', 'kaus', 'khou', '50r'],
      currentLocation: ''
    }
  }

  //change surrentLocation on selected option
  changeCurrentLocation = (e) => {
    this.setState({
      ...this.state,
      currentLocation: e.target.value
    })
  }

  //set the currentLocation on App load
  componentDidMount = () => {
    this.setState({
      currentLocation: this.state.identifiers[0]
    })
  }

  render() {
    return (
      <div>
      <h1>ForeFlight Interview</h1>
      <div className="airport-select">
        <p>Select an airport: </p>
        <select onChange={this.changeCurrentLocation}>
        {this.state.identifiers.map(identifier => <option key={identifier}>{identifier}</option>)}</select>
      </div>
      <br />
      <div className="parent-component">
        {/* passing props to children */}
        <Airports currentLocation={this.state.currentLocation}/>
        <Weather currentLocation={this.state.currentLocation}/>
      </div>
    </div>
    );
  }
}

export default App;
