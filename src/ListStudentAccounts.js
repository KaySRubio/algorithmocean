

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

  export default ListStudentAccounts;