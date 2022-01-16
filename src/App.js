/* Next steps: I have a search component, and want to use serch terms to 
   filter the array of possible algorithms that displays */



import * as React from 'react';
import {ReactDOM} from 'react-dom';
import './App.css';

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

  // dynamic value for searchTerm; if it updates, it will re-render the search component
  const [searchTerm, setSearchTerm] = React.useState('');

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

      <Search onSearch={handleSearch}/> {/* Render the search component. Pass it the property onSearch which is the handleSearch function */}

      <ListAlg list={algorithms} searchBy={searchTerm} /> {/* monkey; new component I'm making */}

    <ListStudentAccounts accounts={accounts} /> {/* Render the ListStudentAccounts component. Pass it the property accounts which is an array of account objects*/}


   
    </div>
  );
}

const ListAlg = ({ list, searchBy }) => {

  const searchedList = list.filter(function (item) {
    return item.toLowerCase().includes(searchBy.toLowerCase());
  });

  return (
    <div>
 
      <ul>

      {/* List without search option 
      {list.map((item, index) => (
          <li key={index}><a href={item}>{item}</a></li>
          ))}
        */}


      {searchedList.map((item, index) => (
          <li key={index}><a href={item}>{item}</a></li>
          ))} 
      </ul>
    </div>
  )
}


const ListStudentAccounts = ({ accounts }) => {
  return ( 
    <div>
      <h1>Student Accounts</h1>
      <ul>
        {accounts.map((student) => (
          <li key={student.id}>
            <span>{student.name} </span>
            <span><a href={student.email}>{student.email}</a> </span>
            <span>{student.teacher}</span>
          </li>
        ))}
      </ul>
    </div>
   );
}

// Search component signature destructures props to show onSearch property
const Search = ({ onSearch }) => {
  //console.log("Search component is re-rendering");

  /* function takes event object as parameter, updates the search term, and then runs onSearch function
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
    onSearch(event);
  };*/

  // in JSX, when data in the input is changed, run handleChange function, also show the searchTerm
  return ( 
    <div>
      <label htmlFor="search">Search: </label>
      <input id="search" type="text" onChange={onSearch}/>
      {/*<p> Searching for <strong>{searchTerm}</strong>.</p>*/}
    </div>
   );
}
 
//export default Search;
//export default ListStudentAccounts;

export default App;

/*

 */