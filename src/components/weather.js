import React from 'react';

class Weather extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            temperature: 0,
            relativeHumidity: 0,
            cloudCoverage: '',
            visibility: 0,
            windSpeed: 0,
            windDirection: 0,
        };
    }
    
    // fetching data and setting state on app load
    componentDidMount() {
        fetch(`http://localhost:3000/weather/${this.props.currentLocation}.json`)
        .then(res => res.json())
        .then(data => this.setState({
            temperature: this.props.currentLocation === '50r' ? 0 : (data.report.conditions.tempC * 1.8) + 32,
            relativeHumidity: this.props.currentLocation === '50r' ? data.report.forecast.conditions[0].relativeHumidity : data.report.conditions.relativeHumidity,
            cloudCoverage: this.props.currentLocation === '50r' ? data.report.forecast.text : data.report.forecast.text,
            visibility: this.props.currentLocation === '50r' ? data.report.forecast.conditions[0].visibility.distanceSm : data.report.conditions.visibility.distanceSm,
            windSpeed: this.props.currentLocation === '50r' ? data.report.forecast.conditions[0].wind.speedKts * 1.150779 : data.report.conditions.wind.speedKts * 1.150779,
            windDirection: this.props.currentLocation === '50r' ? data.report.forecast.conditions[0].wind.direction : data.report.conditions.wind.direction
        }));
    }

    // fetching data and resetting state when the dom changes
    componentDidUpdate() {
        fetch(`http://localhost:3000/weather/${this.props.currentLocation}.json`)
        .then(res => res.json())
        .then(data => this.setState({
            temperature: this.props.currentLocation === '50r' ? 0 : (data.report.conditions.tempC * 1.8) + 32,
            relativeHumidity: this.props.currentLocation === '50r' ? data.report.forecast.conditions[0].relativeHumidity : data.report.conditions.relativeHumidity,
            cloudCoverage: this.props.currentLocation === '50r' ? data.report.forecast.text : data.report.forecast.text,
            visibility: this.props.currentLocation === '50r' ? data.report.forecast.conditions[0].visibility.distanceSm : data.report.conditions.visibility.distanceSm,
            windSpeed: this.props.currentLocation === '50r' ? data.report.forecast.conditions[0].wind.speedKts * 1.150779 : data.report.conditions.wind.speedKts * 1.150779,
            windDirection: this.props.currentLocation === '50r' ? data.report.forecast.conditions[0].wind.direction : data.report.conditions.wind.direction
        }));
        console.log(this.props.currentLocation);
    }

    render() {
        return <div className="sub-component">
                <h2>Weather Report</h2>
                <p>Temperature: {isNaN(this.state.temperature) || this.state.temperature === 0 ? "N/A" : this.state.temperature.toFixed(2) + ' F'}</p>
                <p>Humidity: {this.state.relativeHumidity}%</p>
                <p>Cloud Coverage: <article>{this.state.cloudCoverage}</article></p>
                <p>Visibility: {this.state.visibility} Mi</p>
                <p>Wind Speed: {this.state.windSpeed} MPH</p>
                <p>Wind Direction:
                    {this.state.windDirection === 0 || this.state.windDirection === 360 ? ' N' : this.state.windDirection > 0 && this.state.windDirection < 90 ? ' E' : this.state.windDirection >= 90 && this.state.windDirection < 180 ? ' S' : ' W'}
                    {this.state.windDirection > 0 && this.state.windDirection < 90 ? 'NE ' : this.state.windDirection > 90 && this.state.windDirection < 180 ? 'SE ' : this.state.windDirection > 180 && this.state.windDirection < 270 ? 'SW ' : 'NW '} 
                    ({this.state.windDirection}˚)
                </p>
                </div>
    }
  }

export default Weather;