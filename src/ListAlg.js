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

  export default ListAlg;