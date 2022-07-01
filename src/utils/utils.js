
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