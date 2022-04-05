/* Next steps:
 * Comment code better, and give explanation of what each thing does at the beginning of each component
 * set up a router so that each component is displayed on a different page
 * Create a login page, and username/password pair must match something in the database to go to the homepage
 *    Add password to the data
 *    Separate out first name/last name
 *    Add Institution
 * Learn about how to validate input for security
 * Add a navbar
 * Add a footer
 * Look up how to give students feedback, like should there be a grade (A, B, C...) or a level (Proficient, Learning, Not Started) for each alg so studnets know their progress?
 * An activity component, linked to a good job/rewards component to tell them when they got something right
 */

import * as React from 'react';
import { ReactDOM } from 'react-dom';
import './App.css';
import ListAlg from './ListAlg';
import ListStudentAccounts from './ListStudentAccounts';
import InputWithLabel from './InputWithLabel';
import CreateAccount from './CreateAccount';
import Toggle from './Toggle';

/* App is the root compenent. It displays headers and student name, then calls children */
function App() {
  // Variables needed for displaying student info on the page
  //eventually would get this via fetch request, but just declaring for now
  const account = {
    name: 'Kay',
    gender: 'none, gender is bs',
    email: 'Enter email',
  };

  // Variables and functions used for Search component
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const algorithms = [
    'Bubble Sort',
    'Insertion Sort',
    '0/1 Knapsack',
    'Fractional Knapsack',
    'Huffman Coding',
    'Optimal Binary Search Tree',
    'Traveling Salesperson',
  ];

  /*
const searchedAccounts = accounts.filter.(function (account) {
  return account.name.includes(searchTerm);
});*/

  // dynamic value for searchTerm; if it updates, it will re-render the component
  const [searchTerm, setSearchTerm] = React.useState('');
  let isFocused = true;

  return (
    <div>
      {/* turn off temporariliy
      <nav>
        <p>Learning Algorithms</p>
      </nav>
      */}

      <p>
        Hello how are you doing today <em>Kay said to Judy</em> in a polite but
        aprehensive way.
      </p>
      <p>
        Judy said <strong>I have to go to sleep I'm super tired</strong> to Kay.
      </p>

      {/* Create Account section
      <label>
      </label>
      <h2>Welcome {account.name}</h2>
      <h2>Select an algorithm to practice</h2>

      <InputWithLabel id="search" value={searchTerm} isFocused={isFocused} onInputChange={handleSearch}> 
        Search
      </InputWithLabel>
      <ListAlg list={algorithms} searchBy={searchTerm} /> 
      
      <ul>
        <li tabIndex="0">Hello1</li>
        <li tabIndex="0" id="hello2" disabled="true">Hello2</li>
        <li>Hello3</li>
      </ul>

     
      <button>Button1</button>
      <button tabIndex="0" disabled="true">Button2</button>
      <button>Button3</button>
    
      

      <p>Trying with a break in the middle</p>
      <p><br/></p>

      <p>Trying with an empty span in the middle</p>
      <span> </span>
      <p>Trying the more complex one</p>
      <p><strong>Scene</strong><span> </span><strong>1</strong></p>

      <span>Hello &nbsp; Kay</span>
      <h2>A space character: &nbsp;</h2>

  */}

      <Toggle />
      {/*
     
      <CreateAccount>
        
      </CreateAccount>

      <ListStudentAccounts /> */}
    </div>
  );
}
export default App;

/*
 <ListStudentAccounts accounts={accounts} />
 */
