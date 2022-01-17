


// InputWithLabel Component can be used for any input and any action to take
// upon input, and show any label needed. Just pass in the label, the value you want 
// it to show, and the action you want to happen onInputChange
const InputWithLabel = ({ id, value, onInputChange, isFocused, children }) => {
    
  
    /* function takes event object as parameter, updates the search term, and then runs onSearch function
    const handleChange = (event) => {
      setSearchTerm(event.target.value);
      onSearch(event);
    };*/
  
    // in JSX, when data in the input is changed, run handleChange function, also show the searchTerm
    return ( 
      <div>
        <label htmlFor={id}> {children} </label>
        <input id={id} type="text" value={value} autoFocus={isFocused} onChange={onInputChange}/>
        {/*<p> Searching for <strong>{searchTerm}</strong>.</p>*/}
      </div>
     );
  }

  
  export default InputWithLabel;