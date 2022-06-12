// Attempted to get django to work with react, but could not resolve csrf errors so this is not currently in use
import * as React from 'react';

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
    // if it doesn't exist in browser cookies yet, request from the server
    if(_csrftoken === null){
      this.getCsrfToken();
      _csrftoken = this.getCookie('csrftoken');
      console.log('csrftoken wasnt found in cookie so requested from server, returning:', _csrftoken);
    }
    // Update the token value in the DOM now that it has been found
    this.setState({ csrftoken: _csrftoken });
  }

  // Method to retrieve the csrf token from the server via fetch request
  async getCsrfToken() {
    const response = await fetch(`https://algorithmoceanbackend.herokuapp.com/csrf/`, {
    //const response = await fetch(`/csrf/`, {
      credentials: 'include',
    });
    const data = await response.json();
    let _csrfToken = data.csrfToken;
    return _csrfToken;
  } 

  // Method to get the csrf token value from a cookie if the server already sent it
  // and the browser already saved it
  getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
      console.log('getCookie method is running and this is document.cookie: ', document.cookie);
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
