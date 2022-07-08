
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
    getPracticeScoresFromServer();
  }

 // if any are still blank after call to server, set to zero in local storage
 listOfAlgorithmNamesInDatabase.forEach(e => {
    let score = localStorage.getItem(e);
    if(!score || isNaN(score)){
      localStorage.setItem(e, 0);
    }
  })


  // Make scores into an object and return them to the caller
  let practiceScores = {};
  listOfAlgorithmNamesInDatabase.forEach(e => {
    practiceScores[e] = localStorage.getItem(e);
  })
  return practiceScores;

}

function getPracticeScoresFromServer() {
  const username = localStorage.getItem('username');
  console.log('requesting practice scores from the server for user with username ', username);
  
    const axios = require('axios').default;
    // axios.get("https://algorithmoceanbackend.herokuapp.com/getpracticescores/") // Production
    axios.get('/getpracticescores/', {params: { username: username } }) // Development
    .then(res => {
      console.log(res.data);
      if(res.data) {
        res.data.forEach(e => {
          console.log(e.fields.algorithm, ': ', e.fields.score);
          localStorage.setItem(e.fields.algorithm, e.fields.score);
        });
      }
    })
    .catch(err => console.log(err));
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

function storeScoreInDatabase(algorithmName, score){
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
    
    axios.defaults.withCredentials = true;
    axios.defaults.xsrfCookieName = 'csrftoken';
    axios.defaults.xsrfHeaderName = 'X-CSRFToken';
    axios.defaults.headers.post['Content-Type'] = 'text/html; charset=utf-8 ';

    axios.post("/postpracticescore/", {params: { username: username, algorithmName: algorithmName, score: score }})
      .then(res => {
        console.log('res: ', res);
        // console.log('res.data', res.data);
      })
      .catch(err => {
        console.log('err: ', err);
      }); 
  }


}