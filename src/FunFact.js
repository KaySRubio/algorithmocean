import magnifying_glass from './img/magnifying_glass.png';
import lightbulb from './img/lightbulb.png';
import React, { Component } from 'react';

class FunFact extends Component {

  constructor(props) {
    super(props);
    this.factNum = this.pickRandomFact();
  }

  pickRandomFact(){
    let m = Math.floor(Math.random()*100);
    while(m > this.FACTS.length-1) {
      m = Math.floor(Math.random()*100);
    }
    return m;
  }

  flipAnimation = () => {
    document.getElementById('funFact').classList.toggle('is-flipped');
  }

  FACTS = [
    [
      '<br />There are over 2000 species of jellyfish ranging in size from a half-inch (1 cm) to 118 feet (36 meters) long.<br /><br />If you collected 2000 jellyfish and sorted them by size, how many comparisons would bubble sort involve?<br />',
      '<br />Bubble sort has a Big O of n<sup>2</sup> so with 2000 jellyfish, you would need to make 2000<sup>2</sup>, or 4 million comparisons!<br /><br /><br />Bubble sort is one of the slowest sorting algorithms, but also one of the simplest to learn.<br />'
    ],
    [
      '<br />Nautiluses have lived in the ocean for 500 million years, predating even dinosaurs. When they hatch, their shell has 4 compartments and over time they grow more.<br /><br /><br />What does their shell have to do with the Fibonacci sequence?<br />', 
      '<br />In the Fibonacci sequence, each number is the sum of the 2 numbers that come before it: 0, 1, 1, 2, 3, 5, 8, 13...<br /><br /><br />This mathematical sequence describes the logarithmic spiral of the nautilus&#39;s shell with its compartments of increasing size!'
    ],
    [
      'A fisherman displays her catch at the market by weight. She puts the first fish on the table. The second fish she pulls from her basket is larger, so it goes on the left. The third fish is in between, so it goes in the middle. The fourth fish is the smallest, so it goes to the right…<br /><br />Does this remind you of a sorting algorithm?', 
      '<br />Insertion sort has many practical applications, like picking up playing cards and inserting them in order in your hand.<br /><br /><br />Or, you are doing insert sort when you return library books by inserting them in the right order between other books on the shelves.'
    ],
  ]

  render() {
    return (
      <div className="scene scene--card">
        <div aria-label='Fact about algorithms and ocean science' className="card" id='funFact' onClick={this.flipAnimation}>
          <div className="card__face card__face--front">
            <img alt='' id='factMagnifyingGlass' src={magnifying_glass} />
            <h2>Did you know...</h2>
            <br />
            <p>
              <span dangerouslySetInnerHTML={{ __html: this.FACTS[this.factNum][0]}}></span>
              <br /><br />
              <span className='smallText'>(Click to find out)</span>
            </p>
          </div>
          <div className="card__face card__face--back"> 
            <img alt='' id='factMagnifyingGlass' src={lightbulb} />
            <h2>The more you learn!</h2>
            <br />
            <p dangerouslySetInnerHTML={{ __html: this.FACTS[this.factNum][1]}}></p> 
          </div>
        </div>
      </div>
    );
  }
}

export default FunFact;