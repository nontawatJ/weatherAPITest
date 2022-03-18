import React, {Component} from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLoaded: false,
      changeLat: 0,
      changeLon: 0,
    }
  }
  shouldComponentUpdate() {
    return true;
  }

  componentDidMount() {
    //need to put the api key in 
    fetch('https://api.openweathermap.org/data/2.5/weather?lat=49.2462&lon=-123.1162&appid=' + apiKey)
      .then(res => res.json())
      .then(json => {
        this.setState({
          isLoaded: true,
          data: json,
        })
      });
  }

  handleChange = (e) => {
    //need to put the api key in
    fetch('http://api.openweathermap.org/geo/1.0/direct?q='+e.currentTarget.value+'&appid=' + apiKey)
      .then(res => res.json())
      .then(json => {
        //need to put the api key in
        fetch('https://api.openweathermap.org/data/2.5/weather?lat='+json[0].lat+'&lon='+json[0].lon+'&appid=' + apiKey)
          .then(res => res.json())
          .then(data => {
            this.setState({
              data: data,
              city: json[0].name,
            })
          });
      })
  };
  
  render (){

    if (!this.state.isLoaded){
      return (
        <div>
          <h1>Page is loading...</h1>
        </div>
      )
    }
    else {
      return(
        <div className='body-container'>
          <select className='select-box' onChange={this.handleChange}>
            <option value='vancouver'>Vancouver</option>
            <option value='bangkok'>Bangkok</option>
            <option value='berlin'>Berlin</option>
            <option value='kolkata'>Kolkata</option> 
            <option value='beijing'>Beijing</option>
          </select>
          <p className='headline'>Temperature</p>
          <p className='description'> {(this.state.data.main.temp - 273.15).toFixed(1)}</p>
          <p>Celsius</p>
          <p className='headline'>Weather </p>
          <p className='description'> {this.state.data.weather[0].main} </p>
          <p>({this.state.data.weather[0].description})</p>
        </div>
      )
    }
  }
}
export default App;
