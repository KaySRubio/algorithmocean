// export const backendUrl = 'http://localhost:8000/'; // Development
export const backendUrl = 'https://algorithmoceanbackend.herokuapp.com/'; // Production

// export const frontendUrl = 'http://localhost:3000/'; // Development
export const frontendUrl = 'https://algorithmocean.herokuapp.com/'; // Production

// const fetchMode = 'same-origin'; // Development
const fetchMode = 'cors'; // Production

// Important for some methods below related to retrieving specific scores from local storage and db
export const listOfAlgorithmNamesInDatabase = ['bubblesort', 'insertionsort', 'selectionsort'];

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
  // console.log('getCookie method is running in Csrftoken and this is document.cookie: ', document.cookie);
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
  return cookieValue;
}

export function incrementScore(algorithmName){
  let previousScore = localStorage.getItem(algorithmName);
    
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

    const practiceObjectId = localStorage.getItem(algorithmName + '_id');
    const id = localStorage.getItem('id');
  
    const practiceScoreObject = { 
      csrfmiddlewaretoken: csrftoken, 
      email: id,
      algorithm: algorithmName,
      type: 1,
      score: score,
    };
  
    if(practiceObjectId) {
      putUpdatedScoreInDatabase(practiceObjectId, practiceScoreObject, csrftoken);
    } else {
      postNewScoreToDatabase(practiceScoreObject, csrftoken)
    }
  }
}

function postNewScoreToDatabase(practiceObject, csrftoken) {
  console.log('Posting new score of ', practiceObject.score, ' in database ' + practiceObject.algorithm);

  // fetch(backendUrl + 'api/practices/', { // Production
  fetch('https://algorithmoceanbackend.herokuapp.com/api/practices/', { // Or try this one Production
  // fetch('/api/practices/', { // Development
    credentials: 'include',
    method: 'POST',
    mode: fetchMode,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-CSRFToken': csrftoken,
    },
    body: JSON.stringify(practiceObject)
  })
  .then(response => response.json())  // convert to json
  .then(json => {
    if(json.id){
      localStorage.setItem(practiceObject.algorithm + '_id', json.id);
    }
  })
  .catch(err => {
    console.warn(err);
  }); 
}

function putUpdatedScoreInDatabase(practiceObjectId, practiceObject, csrftoken) {
  console.log('Putting updated score of ', practiceObject.score, ' in database ' + practiceObject.algorithm);

  // fetch(backendUrl + 'api/practices/' + practiceObjectId + '/', { // Production
  fetch('https://algorithmoceanbackend.herokuapp.com/api/practices/' + practiceObjectId + '/', { // Or try this one Production
  // fetch('/api/practices/' + practiceObjectId + '/', { // Development
    credentials: 'include',
    method: 'PUT',
    mode: fetchMode,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-CSRFToken': csrftoken,
    },
    body: JSON.stringify(practiceObject)
  })
  .then(res => {
    console.log('res: ', res);
  })
  .catch(err => {
    console.warn('Error! ', err);
  }); 

}