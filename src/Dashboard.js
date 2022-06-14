import * as React from 'react';

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
    if (first_name === null || first_name === undefined || first_name === 'undefined') window.location.replace('http://localhost:3000/login');
    this.setState({ first_name: first_name });
  }
  
  render(){
    return (
    <div className="dashboard">
      <h1>Congratulations {this.state.first_name} you have logged in!</h1>
    </div>
  );}
}
 
export default Dashboard;