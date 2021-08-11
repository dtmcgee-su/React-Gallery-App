import React, { Component } from "react";
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';
import axios from 'axios';

//App Components
import Nav from './Components/Nav';
import Photo from './Components/Photo';

import apiKey from './config';
const APIKey = apiKey;
// console.log(APIKey);


export default class App extends Component {

  constructor() {
    super();
    this.state = {
      photos: []
    };
  }

  componentDidMount() {
    this.performSearch()
  }

  performSearch = () => {
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${APIKey}&tags=mlb&per_page=24&page=1&format=json&nojsoncallback=1`)
      .then(response => {
        this.setState({
          photos: response.data.photos.photo
        });
      })
      .catch(error => {
        console.log('Error fetching and parsing data');
      });
  }
  render() {
    // console.log('hello world');
    console.log(this.state.photos)
    return (
      <BrowserRouter>
        <div className="container">
          <Switch>
            <Route path='/:topic' component={Photo} />
          </Switch>
          <Nav />
          <Photo />
            {this.state.photos.map(img => {
              const { farm, server, secret, id } = img
              return ( <img src={`https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`} key = {id} alt = ""/> )
            })}
        </div>
      </BrowserRouter>
    )}
    
}


