import * as React from 'react';
import { backendUrl, getCookie } from './utils/utils';

class Csrftoken extends React.Component {
  constructor(props) {
    super(props);

    this.state = { 
      csrftoken: 'x'
    }; 
  }

  componentDidMount() {
    // Try to get it from a cookie if it already exists in browser cookies
    let _csrftoken = getCookie('csrftoken');

    if(_csrftoken !== null && _csrftoken !== "undefined") {
      // console.log('csrftoken was found in browser cookie');
      this.setState({ csrftoken: _csrftoken });
    }
    // if it doesn't exist in browser cookies yet, request from the server
    else {
      this.getCsrfToken();
    }
  }

  // Method to retrieve the csrf token from the server via fetch request
  async getCsrfToken() {
    let _csrfToken = null;
    console.log('csrfToken was not found in cookie so performing request to get it from the server');

    const axios = require('axios').default;
    // axios.get("/csrf/", {withCredentials:true}) // Development
    axios.get(backendUrl + 'csrf/', {withCredentials:true}) // Production
      .then(res => {
        _csrfToken = res.data.result;
        if (_csrfToken !== undefined && _csrfToken !== null) {
          this.setState({ csrftoken: _csrfToken });

          // Give the browser a chance to set it by itself, and see if that worked but hasn't been
          let csrftokenBrowser = getCookie('csrftoken');
          if (csrftokenBrowser !== undefined && csrftokenBrowser !== null) {
            // console.log('Browser set csrf token by itself YAY: ', csrftokenBrowser);
          } else {
            // Issues with browser is not setting the cookie in production, so passed it through response body from django and set manually in JS
            // console.log('Browser did not set csrf token, token still: ', csrftokenBrowser, ' so manually setting token');
            document.cookie = "csrftoken="+_csrfToken+'; SameSite=None; Secure';
          }
        }
      })
        .catch(err => console.log(err));
  } 
  
  // rendering a hidden html element in the form similar to the way django would if this were a static django app.
  // Not sure if this helps with subsequent csrf/cors issues in the login, but trying everything to help resolve csrf/cors
  render(){
    // console.log('this.state.csrftoken', this.state.csrftoken);
    return (
      <input type="hidden" name="csrfmiddlewaretoken" value={this.state.csrftoken} />
    );}
}

export default Csrftoken;










