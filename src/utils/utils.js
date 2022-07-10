
import axios from "axios";

export const backendUrl = 'http://localhost:8000/'; // Development
// export const backendUrl = 'https://algorithmoceanbackend.herokuapp.com/'; // Production

export const frontendUrl = 'http://localhost:3000/'; // Development
// export const frontendUrl = 'https://algorithmocean.herokuapp.com/'; // Production



// Important for some methods below related to retrieving specific scores from local storage and db
const listOfAlgorithmNamesInDatabase = ['bubblesort', 'insertionsort', 'selectionsort'];

// Check if they are logged in based on their name being in local storage
export function checkIfLoggedIn() {
  const first_name = localStorage.getItem('first_name');
  if (first_name !== null && first_name !== undefined && first_name !== 'undefined') {
    return true
  } else return false
}

/* validate form elements, including create password field */
export function validateFormElement(evt) {
  const el = evt.target;
  el.classList.add('checkText');

  if(el.id === 'createPassword') {
    // Show the box telling the user if their password meets requirements
    const requirementsBox = document.getElementById('passwordRequirements');
    const letter = document.getElementById('pwdletter');
    const capital = document.getElementById('pwdcapital');
    const number = document.getElementById('pwdnumber');
    const length = document.getElementById('pwdlength');
    const pwd = evt.target.value;
    const lowerCaseLetters = /[a-z]/g;
    const upperCaseLetters = /[A-Z]/g;
    const numbers = /[0-9]/g;

    requirementsBox.classList.remove('hidden');

    if(pwd.match(lowerCaseLetters)) {
      showAsValid(letter)
    } else {
      showAsInvalid(letter)
    }
    if(pwd.match(upperCaseLetters)) {
      showAsValid(capital)
    } else {
      showAsInvalid(capital)
    }
    if(pwd.match(numbers)) {
      showAsValid(number)
    } else {
      showAsInvalid(number)
    }
    if(pwd.length >= 8) { 
      showAsValid(length)
    } else {
      showAsInvalid(length)
     }
    }
}

function showAsValid(element) {
  element.classList.remove('invalid'); 
  element.classList.add('valid');
  element.innerHTML = element.innerHTML.replace('&#10006;', '&check;'); // Replace X with checkmark
  // Update sr-only text span
  element.innerHTML = element.innerHTML.replace('Your password does not yet meet this requirement. Please update.', 'Your password meets this requirement.'); 
}

function showAsInvalid(element) {
  element.classList.remove('valid'); 
  element.classList.add('invalid');
  element.innerHTML = element.innerHTML.replace('&check;', '&#10006;');  // Replace X with checkmark
  // Update sr-only text span
  element.innerHTML = element.innerHTML.replace('Your password meets this requirement.', 'Your password does not yet meet this requirement. Please update.');
}

// Method to get the csrf token value from a cookie if the server already sent it
// and the browser already saved it
export function getCookie(name) {
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

export function getPracticeScores() {

/*
// TEMPORARY TEST monkey
axios.get('/api/practices/')
  .then(res => {
    console.log('res: ', res);
    // console.log('res.data', res.data);
  })
  .catch(err => {
     console.log('err: ', err);
  }); */

  // Make scores into an object
  let practiceScores = {};

  // monkey - trying to refactor this to use listOfAlgorithmNamesInDatabase
  // rather than listnig them every time
  let scoreIsMissing = false;

  // Deturmine if any of the scores are missing from local storage
  listOfAlgorithmNamesInDatabase.forEach(e => {
    let score = localStorage.getItem(e);
    if(!score || isNaN(score)){
      scoreIsMissing = true;
    }
  })

  if(scoreIsMissing) {
    return getPracticeScoresFromServer();
    
  } else {
    practiceScores = getPracticeScoresFromLocalStorage()
    return practiceScores;
  }
  // console.log('returning practiceScores from getPracticeScores: ', practiceScores);
  




  /*

 // if any are still blank after call to server, set to zero in local storage
 listOfAlgorithmNamesInDatabase.forEach(e => {
    let score = localStorage.getItem(e);
    if(!score || isNaN(score)){
      localStorage.setItem(e, 0);
    }
  })
  
  listOfAlgorithmNamesInDatabase.forEach(e => {
    practiceScores[e] = localStorage.getItem(e);
  })
  return practiceScores; */

}

function getPracticeScoresFromServer() {

  let practiceScores = {}
  const username = localStorage.getItem('username');
  console.log('requesting practice scores from the server for user with username ', username);
  
    const axios = require('axios').default;
    // axios.get("https://algorithmoceanbackend.herokuapp.com/getpracticescores/") // Production
    axios.get('/getpracticescores/', {params: { username: username } }) // Development
    .then(res => {
      console.log(res.data);
      if(res.data) {
        if(res.data[0]) {
          console.log(res.data[0].fields.email); // temp - get the numerical ID
          localStorage.setItem('id', res.data[0].fields.email); // temp - store it in local storage
        }
        // Store each algorithm name and score from the array recieved
        res.data.forEach(e => {
          localStorage.setItem(e.fields.algorithm, e.fields.score);
          localStorage.setItem(e.fields.algorithm + '_id', e.pk);
        });
        
      }
      setBlankPracticeScoresToZero();
      practiceScores = getPracticeScoresFromLocalStorage()
      console.log('returning practiceScores from getScoresFromServer: ', practiceScores);
      return practiceScores;
    })
    .catch(err => {
      console.log(err)
      console.warn('Unable to retrieve practice scores from server');
      setBlankPracticeScoresToZero();
      practiceScores = getPracticeScoresFromLocalStorage()
      return practiceScores;
    });

}

// Get practice scores from local storage
function getPracticeScoresFromLocalStorage() {
  let practiceScores = {}
  listOfAlgorithmNamesInDatabase.forEach(e => {
    practiceScores[e] = localStorage.getItem(e);
  })
  return practiceScores;
}



// if any are still blank after call to server, set to zero in local storage
function setBlankPracticeScoresToZero() {
  listOfAlgorithmNamesInDatabase.forEach(e => {
    let score = localStorage.getItem(e);
    if(!score || isNaN(score)){
      localStorage.setItem(e, 0);
    }
  })
}

export function incrementScore(algorithmName){
  let previousScore = localStorage.getItem(algorithmName);

    // If it does not exist in local storage, get it from the database
    if(previousScore === undefined || isNaN(previousScore) || previousScore === null ) {
      console.log('previousScore was not defined or NaN so requesting from database');
      let practiceScores = getPracticeScores()
      console.log(practiceScores);
      
      previousScore = practiceScores[algorithmName];
    }
    
    let previousScoreNum = parseFloat(previousScore);
    let newScore = 0;
    newScore = previousScoreNum + 1;

    storeScoreInLocalStorage(algorithmName, newScore);
    storeScoreInDatabase(algorithmName, newScore);
}


function storeScoreInLocalStorage(algorithmName, score){
  let scoreString = score.toString();
  localStorage.setItem(algorithmName, scoreString);
}

function storeScoreInDatabase(algorithmName, score) {
  // get email from local storage
  const username = localStorage.getItem('username');

  // get csrf token from local storage
  let csrftoken = getCookie('csrftoken');

  if(username === undefined || username === null) {
    console.warn('Attempted to send grade to database but username not found in browser storage');
  } else if (csrftoken === null) {
    console.warn('Attempted to send grade to database but csrf token not found in browser storage');
  } else {
    console.log('storing score of ', score, ' in database for ', username, ' for', algorithmName);
  }
  
  // monkey
  const practiceObjectId = localStorage.getItem(algorithmName + '_id');
  const id = localStorage.getItem('id');

  // Create a string to send to the server with the information for a practice score object
  let practiceObjectString1 = 'csrfmiddlewaretoken='+csrftoken+'&email='+id+'&algorithm='+algorithmName+'&type=1&score='+score+'&_save=Save';
  console.log('practiceObjectId: ', practiceObjectId);
  console.log(practiceObjectString1);
  // &email=53&algorithm=bubblesort&type=1&score=4&_save=Save


  const practiceScoreObject = { 
    csrfmiddlewaretoken: csrftoken, 
    email: id, 
    algorithm: algorithmName,
    type: 1,
    score: score,
  };

  //let practiceObjectString2 = 'csrfmiddlewaretoken='+csrftoken+'&email='+'hello2@gmail.com'+'&algorithm='+algorithmName+'&type=1&score='+score+'&_save=Save';
  // let practiceObjectString2 = 'csrfmiddlewaretoken='+csrftoken+'&email='+id+'&algorithm='+algorithmName+'&type=1&score='+score+'&_save=Save';
  let practiceObjectString2 = 'csrfmiddlewaretoken='+csrftoken+'&email='+id+'&algorithm='+algorithmName+'&type=1&score='+score;
  console.log(practiceObjectString2);


  if(practiceObjectId) {
    putUpdatedScoreInDatabase(practiceObjectId, practiceObjectString1, csrftoken);
  } else {
    postNewScoreToDatabase(practiceScoreObject, csrftoken)
  }

}

function postNewScoreToDatabase(practiceObjectString, csrftoken) {
  console.log('posting new score object in database');


  // monkey - going insane here, this method keeps running even after commented it out and restarted server.
  // I can't figure out where something like this is being called???

  
  // fetch(backendUrl + 'api/practices/', { // Production
  // fetch('https://algorithmoceanbackend.herokuapp.com/api/practices/', { // Or try this one Production
  fetch('/api/practices/', { // Development
    credentials: 'include',
    method: 'POST',
    mode: 'same-origin', // Development
    // mode: 'cors', // Production
    headers: {
      // 'Accept': 'application/json; text/html; charset=utf-8',
      'Accept': 'application/json',
      // 'Accept': 'text/html; charset=utf-8',
      // 'Content-Type': 'text/html; charset=utf-8',
      'Content-Type': 'application/json',
      'X-CSRFToken': csrftoken,
    },
    // body: practiceObjectString
    body: JSON.stringify(practiceObjectString)
  })
  .then(res => {
    console.log('res: ', res);
    // console.log('res.data', res.data);
  })
  .catch(err => {
    console.log('error')
    console.log('err: ', err);
    console.log('somthing is wrong here');
  }); 
  

  /*
  axios.defaults.withCredentials = true;
  axios.defaults.xsrfCookieName = 'csrftoken';
  axios.defaults.xsrfHeaderName = 'X-CSRFToken';
  axios.defaults.headers.post['Content-Type'] = 'text/html; charset=utf-8 ';
    

    // axios.post("/postpracticescore/", {params: { username: username, algorithmName: algorithmName, score: score }})
    // axios.post("/api/practices/", )
    axios.post('/api/practices/', practiceObjectString)
      .then(res => {
        console.log('res: ', res);
        // console.log('res.data', res.data);
      })
      .catch(err => {
        console.log('err: ', err);
      }); 
  }
  */

}


function putUpdatedScoreInDatabase(practiceObjectId, practiceObjectString, csrftoken) {
  console.log('putting updated score in database');
  axios.defaults.withCredentials = true;
  axios.defaults.xsrfCookieName = 'csrftoken';
  axios.defaults.xsrfHeaderName = 'X-CSRFToken';
  axios.defaults.headers.post['Content-Type'] = 'text/html; charset=utf-8 ';
    

    // axios.post("/postpracticescore/", {params: { username: username, algorithmName: algorithmName, score: score }})
    // axios.post("/api/practices/", )
    axios.put('/api/practices/' + practiceObjectId + '/', practiceObjectString)
      .then(res => {
        console.log('res: ', res);
        // console.log('res.data', res.data);
      })
      .catch(err => {
        console.log('err: ', err);
      }); 
  
}