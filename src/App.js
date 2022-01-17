
import * as React from 'react';
import {ReactDOM} from 'react-dom';
import './App.css';
import ListAlg from './ListAlg';
import ListStudentAccounts from './ListStudentAccounts';
import InputWithLabel from './InputWithLabel';
import CreateAccount from './CreateAccount';

/* Can create the account objects using object literal notation
const accounts = [
  {
    name: 'Kay Rubio',
    email: 'KRubio@cainc.com',
    teacher: 'Mrs. D',
    id: 0,
  },
  {
    name: 'Judy Rubio',
    email: 'JRubio@cainc.com',
    teacher: 'Mrs. D',
    id: 1,
  }
]
*/

/* App is the root compenent. It displays headers and student name, then calls children */
function App() {

  // Variables needed for displaying student info on the page
  //eventually would get this via fetch request, but just declaring for now
const account = {
  name: 'Enter name',
  email: 'Enter email',
  teacher: 'Enter teacher'
};

// variables used in ListStudentAccounts component
// OR can create account objects using a class with a constructor, and instantiating 2 objects
// then putting them in a list
class Account {
  constructor(name, email, teacher, id){
    this.name = name;
    this.email = email;
    this.teacher = teacher;
    this.id = id;
  }
  //getName() {return this.name;} // not sure get methods are needed since the properties aren't private
  //getEmail() {return this.email;}
  //getTeacher() {return this.teacher;}
  //getId() {return this.id;}

}
const kay = new Account('Kay Rubio', 'KRubio@cainc.com', 'Mrs. D', 0);
const judy = new Account('Judy Rubio', 'JRubio@cainc.com', 'Mrs. D', 1);
const accounts = [kay, judy];

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

      <ListStudentAccounts accounts={accounts} /> {/* Render the ListStudentAccounts component. Pass it the property accounts which is an array of account objects*/}
      <CreateAccount>
        
      </CreateAccount>
    </div>
  );
}
export default App;



