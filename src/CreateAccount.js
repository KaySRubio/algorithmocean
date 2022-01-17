import InputWithLabel from './InputWithLabel';
import * as React from 'react';


const CreateAccount = () => {
   
    // this dynamic variable will hold what the user types in the field
    const [entry, setEntry] = React.useState('');
    let isFocused=false;
    // this function will ensure that what the user types in the field actually appears in the field
    const displayInput = (event) => {
        setEntry(event.target.value);
      }

    return ( 
        <div>
            <h1>Create Account</h1>
            <InputWithLabel id="name" value={entry} isFocused={isFocused} onInputChange={displayInput}> 
            Name
            </InputWithLabel>
            <InputWithLabel id="name" value={entry} isFocused={isFocused} onInputChange={displayInput}> 
            Email
            </InputWithLabel>
        </div>
     );
}
 
export default CreateAccount;

/*

*/