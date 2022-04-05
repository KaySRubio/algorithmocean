/*import useFetch from './useFetch';

const ListStudentAccounts = () => {

    const { data: accounts, error, isPending } = useFetch('http://localhost:8000/accounts/');

    return ( 
        <div className="account-list">
            <h1>Student Accounts</h1>
            { isPending && <div>Loading...</div> }
            { error && <div>{ error }</div>}
       
            <table>
            { accounts && (
                accounts.map((account) => (
                   
                        <tbody key={account.id}>
                            <td>{ account.name }</td>
                            <td>{ account.email }</td>
                        </tbody>
                   
                )))}
            </table>

        </div>
    );
  }



http://localhost:8000/blogs/


Version where I just printed 1 blog
import useFetch from './useFetch';

const ListStudentAccounts = () => {


    const { data: studentAccounts, error, isPending } = useFetch('http://localhost:8000');

    return ( 
      <div className="student-account-list">
        <h1>Student Accounts</h1>
        <ul>
        { isPending && <div>Loading...</div> }
        { error && <div>{ error }</div>}


        { studentAccounts && (
            <div>
                <p>{studentAccounts.name}</p>
                <p>{studentAccounts.email}</p>
            </div>
        )
        }


       
        </ul>
      </div>
     );
  }
*/


/* Older version that printed what was passed to it without calling useFetch()
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
*/
  export default ListStudentAccounts;
  