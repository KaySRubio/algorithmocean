// src/App.js
/* Attempted to create a django back end, but nothing will resolve the csrf errors so this code is not in use */

import React, { Component } from 'react';

//const API_HOST = 'http://localhost:8000';

let _csrfToken = null;

async function getCsrfToken() {
  if (_csrfToken === null) {
    const response = await fetch(`/csrf/`, {
      credentials: 'include',
    });
    const data = await response.json();
    _csrfToken = data.csrfToken;
  }
  console.log(_csrfToken);

  document.cookie = "csrftoken="+_csrfToken;

  return _csrfToken;
}



async function testRequest(method) {

  const response = await fetch(`/ping/`, {
    method: method,
    headers: (
      method === 'POST'
       //? {'XSRF-TOKEN': await getCsrfToken()}
      //   ? {'X-CSRFToken': await getCsrfToken()}
        ? {'X-CSRFToken': await getCsrfToken()}
        : {}
    ),
    credentials: 'include',
  });
  const data = await response.json();
  return data.result;
}


class Token extends Component {

  constructor(props) {
    super(props);
    this.state = {
      testGet: 'KO',
      testPost: 'KO',
    };
  }

  async componentDidMount() {
    this.setState({
      testGet: await testRequest('GET'),
      testPost: await testRequest('POST'),
    });
  }

  render() {
    return (
      <div>
        <p>Test GET request: {this.state.testGet}</p>
        <p>Test POST request: {this.state.testPost}</p>
      </div>
    );
  }
}

export default Token;