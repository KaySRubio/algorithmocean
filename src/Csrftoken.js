// Attempted to get django to work with react, but could not resolve csrf errors so this is not currently in use
import * as React from 'react';
import axios from "axios";

class Csrftoken extends React.Component {
  constructor(props) {
    super(props);

    this.state = { 
      csrftoken: 'x'
    }; 

  }



  componentDidMount() {
    // Try to get it from a cookie if it already exists in browser cookies
    let _csrftoken = this.getCookie('csrftoken');
    
    console.log('if csrftoken was found in cookie, returning:', _csrftoken);

    if(_csrftoken !== null) this.setState({ csrftoken: _csrftoken });
    // if it doesn't exist in browser cookies yet, request from the server
    else {
      //let _csrftokenObject = this.getCsrfToken();
      this.getCsrfToken();
      // the getCsrfToken requests it from the server, and returns a json object, so need to get the inside string
      // monkey
      // console.log('_csrftokenObject: ', _csrftokenObject);
      // console.log('_csrftokenObject.result: ', _csrftokenObject.result);
      // _csrftoken = _csrftokenObject.result;

      //_csrftoken = this.getCookie('csrftoken'); // used in development, but not working in production because browser not setting cookie
      // console.log('csrftoken wasnt found in cookie so requested from server, returning:', _csrftoken);
    }
  }

  // Method to retrieve the csrf token from the server via fetch request
  async getCsrfToken() {
    let _csrfToken = null;

    /* Workaround for Production  */
    const axios = require('axios').default;
    axios.defaults.baseURL = 'https://algorithmoceanbackend.herokuapp.com/';
    axios.get("/csrf/", {withCredentials:true})
    // Browser is not setting the cookie in production, so passed it through response body
      .then(res => {
        console.log(res);
        console.log(res.data);
        _csrfToken = res.data.result;
        if (_csrfToken !== undefined && _csrfToken !== null) {
          this.setState({ csrftoken: _csrfToken });
          document.cookie = "csrftoken="+_csrfToken;
        }

        //return _csrfToken;
      })
        .catch(err => console.log(err));
    
    /* Working in development to set the csrf token in a cookie, but not working in production
    // const response = await fetch(`https://algorithmoceanbackend.herokuapp.com/csrf/`, {
    const response = await fetch(`/csrf/`, {
      credentials: 'include',
    });
    const data = await response.json();
    //_csrfToken = data.csrfToken;
    document.cookie = "csrftoken="+data.csrfToken; 
    */

  } 
  

  // Method to get the csrf token value from a cookie if the server already sent it
  // and the browser already saved it
  getCookie(name) {
    let cookieValue = null;
    console.log('getCookie method is running in Csrftoken and this is document.cookie: ', document.cookie);
    if (document.cookie && document.cookie !== '') {
      console.log('attempting to get ', name, ' from cookie');
      var cookies = document.cookie.split(';');
      for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();
        if (cookie.substring(0, name.length + 1) === (name + '=')) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }

  render(){
    console.log('this.state.csrftoken', this.state.csrftoken);
    return (
      <input type="hidden" name="csrfmiddlewaretoken" value={this.state.csrftoken} />
      
    );}
}

export default Csrftoken;









// const csrftoken = getCookie('csrftoken');

/*
let _csrfToken = getCsrfToken();
console.log(_csrfToken);
let csrftoken = getCookie('csrftoken');
console.log(this.csrfToken);

async function getCsrfToken() {
  if (_csrfToken === null) {
    const response = await fetch(`/csrf/`, {
      credentials: 'include',
    });
    const data = await response.json();
    _csrfToken = data.csrfToken;

  }
  //document.cookie = "csrftoken="+_csrfToken;
  console.log("in csrftoken component: ", _csrfToken);
  return _csrfToken;
} 


function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  console.log('cookieValue: ', cookieValue);
  return cookieValue;
}

/* Only returns null
function getCookie(name) {

  var cookieValue = null;
  console.log("document.cookie: ", document.cookie);
  
  if (document.cookie && document.cookie !== '') {
    console.log('this ran');
      var cookies = document.cookie.split(';');
      for (var i = 0; i < cookies.length; i++) {
          var cookie = cookies[i].trim();
          // Does this cookie string begin with the name we want?
          if (cookie.substring(0, name.length + 1) === (name + '=')) {
              cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
              break;
          }
      }
  }
  console.log('cookieValue: ', cookieValue); */



  
  // console.log('csrftoken', csrftoken);

//   return cookieValue;
// } 

/* ONLY RETURNS NULL
function getCookie(name) {
  if (!document.cookie) {
    return null;
  }

  const xsrfCookies = document.cookie.split(';')
    .map(c => c.trim())
    .filter(c => c.startsWith(name + '='));

  if (xsrfCookies.length === 0) {
    return null;
  }
  return decodeURIComponent(xsrfCookies[0].split('=')[1]);
} */

/*
const CSRFToken = () => {
  //console.log(csrftoken);

    return (
      <input type="hidden" name="csrfmiddlewaretoken" value={csrftoken} />
    );
}; */

// {/*<input type="hidden" name="csrfmiddlewaretoken" value={csrftoken} />*/}
