

/* validate form elements, especially password requirements */
export function validateFormElement(evt) {
  const el = evt.target;
  el.classList.add('checkText');

  if(el.id === 'createPassword') {
    const requirementsBox = document.getElementById("passwordRequirements");
    const letter = document.getElementById("pwdletter");
    const capital = document.getElementById("pwdcapital");
    const number = document.getElementById("pwdnumber");
    const length = document.getElementById("pwdlength");
    const pwd = evt.target.value;
    const lowerCaseLetters = /[a-z]/g;
    const upperCaseLetters = /[A-Z]/g;
    const numbers = /[0-9]/g;

    requirementsBox.classList.remove('hidden');

    if(pwd.match(lowerCaseLetters)) {
      letter.classList.remove('invalid'); 
      letter.classList.add('valid');
    } else {
      letter.classList.remove('valid'); 
      letter.classList.add('invalid');
    }
    if(pwd.match(upperCaseLetters)) {
      capital.classList.remove('invalid'); 
      capital.classList.add('valid');
    } else {
      capital.classList.remove('valid'); 
      capital.classList.add('invalid');
    }
    if(pwd.match(numbers)) {
      number.classList.remove('invalid'); 
      number.classList.add('valid');
    } else {
      number.classList.remove('valid'); 
      number.classList.add('invalid');
    }
    if(pwd.length >= 8) {
      length.classList.remove('invalid'); 
      length.classList.add('valid');
    } else {
      length.classList.remove('valid'); 
      length.classList.add('invalid');
     }
    }
}