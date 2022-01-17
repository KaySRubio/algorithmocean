/* Make the display function more generalized, so takes a parameter and calls the right set method?
  Or call it in the handle? */

import InputWithLabel from './InputWithLabel';
import * as React from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

const CreateAccount = () => {
   
    // this dynamic variable will hold what the user types in the field
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    let isFocused=false;
    // this function will ensure that what the user types in the field actually appears in the field

    /* does not work to combine them, it for some reason can't seem to recieve the value parameter
    const updateData = (value, event) => {
        console.log(event.target.value);
        switch(value) {
            case "name":  setName(event.target.value); break;
            case "name": setEmail(event.target.value); break;
        }
      }
      */
  
      const updateName = (event) => {
        setName(event.target.value);
      }
      const updateEmail = (event) => {
      setEmail(event.target.value);
      }   

      const [isPending, setIsPending] = useState(false); // dynamic variable for keeping track of a loading message during blog being sent to server

      const history = useHistory(); // create a history object by calling the useHistory() constructor
  
    
      const handleSubmit = (e) => {
          e.preventDefault(); 
          const account = { name, email }; 
  
          console.log(account); 
          setIsPending(true); 
  
          fetch('http://localhost:8000/accounts/', {
              method: 'POST',
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(account)
          }).then(() =>{
              console.log('new account added');
              setIsPending(false);
              //history.go(-1); // go back to the previous page
              //history.push('/'); // go to the home page once a router is set up
          })
  
      }

    return ( 
        <div>
            <h1>Create Account</h1>
            <form onSubmit={handleSubmit}>
                <InputWithLabel id="name" value={name} isFocused={isFocused} onInputChange={updateName}> 
                Name
                </InputWithLabel>
                <InputWithLabel id="email" value={email} isFocused={isFocused} onInputChange={updateEmail}> 
                Email
                </InputWithLabel>
                {!isPending && <button>Add Blog</button>} {/* output this button that works if a fetch request is not currently pending*/}
                {isPending && <button disabled>Adding Blog...</button>}       {/* output the pending message inside a disabled button if a fetch request is still running */}         
                <p>{ name }</p><p>{ email }</p>{/* for debugging, you can view the state data on the page here */}
            </form>
        </div>
     );
}
 
export default CreateAccount;

/*

*/