import * as React from 'react';
import { Link } from 'react-router-dom';
import hermitcrab from './img/hermitcrab.png';

class Dashboard extends React.Component {
   constructor(props) {
    super(props);
    this.state = { 
      first_name: '',
    };
  } 

  componentDidMount() {
    const first_name = localStorage.getItem('first_name');
    console.log('first_name', first_name);
    if (first_name === null || first_name === undefined || first_name === 'undefined') {
      // window.location.replace('http://localhost:3000/login'); // Development
      window.location.replace('https://stormy-sierra-07970.herokuapp.com/login'); // Production
    }
    this.setState({ first_name: first_name });
  }
  
  render(){
    return (
    <div className="dashboard">
      <div className="dashboardHeading">
        <p id="dashboardWelcome">Welcome {this.state.first_name}!</p>
        <h1>Student Dashboard</h1>
      </div>
      <img id="dashboardImg" src={hermitcrab} alt="A red hermit crab with a yellow shell that is holding one claw upwards"/>

      <div className="dashboardSection" id="dashboardAssignments">
        <div className="dashboardSectionTitle">
          <h2>Assignments</h2>
          <label>Show only To Do</label>
          <input type="checkbox" id="fname" name="fname"></input>
        </div>
        <p>No assignments.</p>
        <p>Expecting assignments?  Check your Account and make sure you have entered the correct class code.</p>
      </div>

      <div className="dashboardSection" id="dashboardPractice">
        <div className="dashboardSectionTitle">
          <h2>Practice</h2>
        </div>
        <table>
          <tbody>
            <tr>
              <th>Algorithm</th>
              <th className="tableCol2">Points Earned</th>
            </tr>
            <tr>
              <td><Link className="link" to="/demo-lesson/bubble">Bubble Sort</Link></td>
              <td className="tableCol2">2</td>
            </tr>
            <tr>
              <td><Link className="link" to="/demo-lesson/selection">Selection Sort</Link></td>
              <td className="tableCol2">3</td>
            </tr>
            <tr>
              <td><Link className="link" to="/demo-lesson/insertion">Insertion Sort</Link></td>
              <td className="tableCol2">8</td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  );}
}
 
export default Dashboard;