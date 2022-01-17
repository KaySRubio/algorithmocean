
import * as React from 'react';
import {ReactDOM} from 'react-dom';
import './App.css';
import ListAlg from './ListAlg';
import ListStudentAccounts from './ListStudentAccounts';
import InputWithLabel from './InputWithLabel';
import CreateAccount from './CreateAccount';




/* App is the root compenent. It displays headers and student name, then calls children */
function App() {

  // Variables needed for displaying student info on the page
  //eventually would get this via fetch request, but just declaring for now
  const account = {
    name: 'Kay',
    email: 'Enter email',
  };
  

// Variables and functions used for Search component
const handleSearch = (event) => {
  setSearchTerm(event.target.value);
}

const algorithms = ['Bubble Sort', 'Insertion Sort', '0/1 Knapsack', 'Fractional Knapsack', 'Huffman Coding', 'Optimal Binary Search Tree', 'Traveling Salesperson' ];

/*
const searchedAccounts = accounts.filter.(function (account) {
  return account.name.includes(searchTerm);
});*/

  // dynamic value for searchTerm; if it updates, it will re-render the component
  const [searchTerm, setSearchTerm] = React.useState('');
  let isFocused=true;


  return (
    <div>
      <nav>
        <p>Learning Algorithms</p>
      </nav>

      {/* Create Account section */}
      <label>
      </label>
      <h2>Welcome {account.name}</h2>
      <h2>Select an algorithm to practice</h2>

      <InputWithLabel id="search" value={searchTerm} isFocused={isFocused} onInputChange={handleSearch}> {/* Render the search component. Pass it the property onSearch which is the handleSearch function */}
        Search
      </InputWithLabel>
      <ListAlg list={algorithms} searchBy={searchTerm} /> {/* monkey; new component I'm making */}

     
      <CreateAccount>
        
      </CreateAccount>

      <ListStudentAccounts />
    </div>
  );
}
export default App;

/*
 <ListStudentAccounts accounts={accounts} />
 */

