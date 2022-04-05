
import React from 'react'
class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isToggleOn: true};

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
    this.handleKey = this.handleKey.bind(this); // keyDown event bind

    this.radioButtonNodeList = [];
    this.makeRadioButtonNodeList = this.makeRadioButtonNodeList.bind(this);
   
  }


  

  componentDidMount(){
    this.makeRadioButtonNodeList();
  }
  
  makeRadioButtonNodeList = () => {
    this.radioButtonNodeList = document.querySelectorAll('button');
    console.log(this.radioButtonNodeList);
    console.log(this.radioButtonNodeList.item(0).disabled); // should show true
    console.log(this.radioButtonNodeList.item(1).disabled); // should show true
    console.log(this.radioButtonNodeList.item(2).disabled); // should show false
    console.log(this.radioButtonNodeList.item(3).disabled); // should show false
    console.log(this.radioButtonNodeList.item(3).disabled); // should show false

    const arr = Array.from(this.radioButtonNodeList);
    console.log(arr);
    console.log(arr[0].disabled); 
    console.log(arr[1].disabled); 
    console.log(arr[2].disabled); 
    console.log(arr[3].disabled); 
    console.log(arr[4].disabled); 
    const activeButtons = arr.filter(button => button.disabled!=true); // returns all buttons even when some are disabled
    console.log("Only Active Buttons"); 
    console.log(activeButtons); 

    //in CA's repo, it was showing true always, even when button was NOT disabled
    // Unclear if it was accessing the disabled property in the <button> or the <Button> 
    // or something else? But they should all match?
  }

  handleClick() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  }

  // keyDown event method
  handleKey(e) {
      /*console.log("hello");
      console.log("e.target is " + e.target);
      console.log("e.currentTarget.id is " + e.currentTarget.id);
      console.log("e.target is " + e.target);
      console.log("e.target is " + e.target.id);*/
  }

  render() {
    return (
        <>

      <button disabled={true}>Button 1</button>
      <button disabled>Button 2</button>
      <button disabled={false}>Button 3</button>
      <button disabled={false}><span>Button 4</span></button>
      <button >Button 5</button>

    
    {/*
        <h1>Experiment with event handling</h1>
        <li id='list' onKeyDown={this.handleKey} >
          <button id='ButtonA' >Button A</button>
          <button id='ButtonB'>Button B</button>
        </li>


      <button 
        onClick={this.handleClick}
        //onKeyDown={this.handleKey} // keyDown event handler
        >
        {this.state.isToggleOn ? 'ON' : 'OFF'}
      </button>*/}
      </>
    );
  }
}

export default Toggle;