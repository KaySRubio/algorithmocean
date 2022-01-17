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

  
  export default Search;