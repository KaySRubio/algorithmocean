import * as React from 'react';
import { Link } from 'react-router-dom';
import hermitcrab from './img/hermitcrab.png';
import { checkIfLoggedIn, backendUrl, listOfAlgorithmNamesInDatabase, frontendUrl } from './utils/utils';

class Dashboard extends React.Component {
   constructor(props) {
    super(props);
    this.state = { 
      first_name: '',
      practiceScores: {'bubblesort': 0, 'insertionsort': 0, 'selectionsort': 0},
    };
  } 

  componentDidMount() {
    if(!checkIfLoggedIn()){
      // window.location.replace('http://localhost:3000/login'); // Development
      // window.location.replace('https://algorithmocean.herokuapp.com/login'); // Production
      window.location.replace(frontendUrl + 'login');
    } else {
      const first_name = localStorage.getItem('first_name');
      this.setState({ first_name: first_name });
    }
    this.getPracticeScores();
  }

  getPracticeScores() {
    let scoreIsMissing = false;
  
    // Deturmine if any of the scores are missing from local storage
    listOfAlgorithmNamesInDatabase.forEach(e => {
      let score = localStorage.getItem(e);
      if(!score || isNaN(score)){
        scoreIsMissing = true;
      }
    })
  
    if(scoreIsMissing) {
      this.getPracticeScoresFromServer()
    } else {
      this.setBlankPracticeScoresToZero();
      this.getPracticeScoresFromLocalStorage()
    }
    
  }
  
  getPracticeScoresFromServer() {
    const username = localStorage.getItem('username');
    console.log('requesting practice scores from the server for user with username ', username);
    
      const axios = require('axios').default;
      axios.get("https://algorithmoceanbackend.herokuapp.com/getpracticescores/") // Production
      // axios.get('/getpracticescores/', {params: { username: username } }) // Development
      .then(res => {
        if(res.data) {
          // Store each algorithm score object's ID and score from the array recieved from server
          res.data.forEach(e => {
            let algorithmName = e.fields.algorithm;
            localStorage.setItem(algorithmName, e.fields.score);
            localStorage.setItem(algorithmName + '_id', e.pk);
          })
          // console.log('Storing in local storage: ', res.data);
        }
        this.setBlankPracticeScoresToZero(); // If any were not recieved from server, set to zero
      })
      .catch(err => {
        console.warn(err);
      });
  
  }
  
  // Get practice scores from local storage
  getPracticeScoresFromLocalStorage() {
    let practiceScores = {}
    listOfAlgorithmNamesInDatabase.forEach(e => {
      practiceScores[e] = localStorage.getItem(e);
    })
    this.setState({ practiceScores: practiceScores });
  }
  
  // if any are still blank after call to server, set to zero in local storage
  setBlankPracticeScoresToZero() {

    listOfAlgorithmNamesInDatabase.forEach(e => {
      let score = localStorage.getItem(e);
      if(!score || isNaN(score)){
        localStorage.setItem(e, 0);
      }
    })

    this.getPracticeScoresFromLocalStorage();
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
        <p>The ability for teachers to assign assignments to classes of students is coming soon!</p>
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
              <td className="tableCol2">{this.state.practiceScores ? this.state.practiceScores.bubblesort : '0'}</td>
            </tr>
            <tr>
              <td><Link className="link" to="/demo-lesson/selection">Selection Sort</Link></td>
              <td className="tableCol2">{this.state.practiceScores ? this.state.practiceScores.selectionsort : '0'}</td>
            </tr>
            <tr>
              <td><Link className="link" to="/demo-lesson/insertion">Insertion Sort</Link></td>
              <td className="tableCol2">{this.state.practiceScores ? this.state.practiceScores.insertionsort : 0}</td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  );}
}

// <p>Expecting assignments?  Check your Account and make sure you have entered the correct class code.</p>
export default Dashboard;