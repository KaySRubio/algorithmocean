import { Link } from 'react-router-dom';
import naut from './img/naut.png';
import nautInside from './img/nautInside2.png';
import lightbulb from './img/lightbulb.png';
import peopleCheering from './img/peopleCheering.png';
import endless from './img/endless.png';
import numbers from './img/numbers1.png';
import swapc from './img/swapc6.png';
import bumpyBorder from './img/bumpyBorder1.png';
import teacher from './img/teacher.png';
import portrait from './img/portraitPlaceholder.png';

const Home = () => {
  return (
    <div className="home">
      <div className='homeRowDark'>
        <div className='innerRow' id="innerRow1">
          <div id='row1col1'>
            <h1 className='homeRowDark'>Plunge into learning algorithms</h1>
            <h2 className='homeRowDark'>Revolutionizing how algorithms are taught<br />for people who learn by DOING.</h2>
          </div>
          <div id='row1col2' className='hoverWrapper'>
            <img src={naut} className='naut' alt="A nautilus sea creature with a spiral shell, an eye, and several tentacles."/>
            <img className='naut hoverShow' src={nautInside} alt="The inside of a spiral nautilus shell with split into boxes according to fibonnaci numbers, with 1 being the closest to the inside of the spiral, then 3, 5, 8, 13, 21, and 34 being the largest outside part of the spiral."/>
          </div>
        </div>
      </div>

      <div className='homeRowLight'>
        <div className='innerRow' id="innerRow2">
          <div className='col1of3'>
            <img src={lightbulb} alt="A lightbulb lighting up, a symbol of learning."/>
            <h3 className='homeRowLight'>No prior knowledge required</h3>
            <p className='homeRowLight'>With videos, hints, and instant feedback you&apos;ll have all the support you need.</p>
          </div>
          <div className='col1of3'>
          <img src={peopleCheering} alt="A symbol of two human stick figures cheering, one is smiling."/>
            <h3 className='homeRowLight'>Completely Free</h3>
            <p className='homeRowLight'>Built by a computer science student, for computer science students.</p>
          </div>
          <div className='col1of3'>
            <img src={endless} alt="A curly symbol with arrows representing unlimitted opportunities."/>
            <h3 className='homeRowLight'>Endless Practice</h3>
            <p className='homeRowLight'>Problems are randomly generated so there are plenty of opportunities to practice.</p>
          </div>
        </div>
      </div>

      <div className='homeRowDark'>
        <div className='innerRow' id="innerRow3">
          <div id='row3col1'>
            <img src={numbers} id='homeNumbers' alt="An image of an array of numbers 28, 34, 38, 48, 52, 75."/>
            <img src={swapc} id='homeSwap' alt="A symbol for swapping two numbers that looks like a curved U-shaped arrow."/>
          </div>
          <div id='row3col2' >
            <h2 className='homeRowDark'>How it works</h2>
            <p className='homeRowDark'>You solve a problem using an algorithm on the screen. The program performs the algorithm behind the scenes. When you&apos;re done, your moves are compared with the program&apos;s moves. You get a detailed report of what you did right, and where you may have gone astray. No coding involved.</p>
          </div>
        </div>
      </div>

      <div className='homeRowLight'>
        <div className='innerRow' id="innerRow5">
          <div id='row5col1'>
            <h2 className='homeRowLight'>Try one!</h2>
            <br />
            <Link className="link" to="/lesson/bubble">Bubble Sort</Link>
            <br />
            <br />
            <Link className="link" to="/lesson/insertion">Insertion Sort</Link>
            <br />
            <br />
            <Link className="link" to="/lesson/selection">Selection Sort</Link>
          </div>
          <div id='row5col2'>
            <h2 className='homeRowLight'>Coming Soon</h2>
            <table>
              <tr>
                <td>Mergesort</td>
                <td>Huffman Coding</td>
                <td>Knapsack Problem</td>
              </tr>
              <tr>
                <td>Quicksort</td>
                <td>Optimal Binary Search Tree</td>
                <td>Traveling Salesperson</td>
              </tr>
              <tr>
                <td>Heapsort</td>
                <td>Minimum Spanning Tree</td>
                <td>Assembly Line</td>
              </tr>
              <tr>
                <td>Dijkstra Shortest Path</td>
                <td></td>
                <td></td>
              </tr>
            </table>
          </div>
        </div>
      </div>

      <div className='homeRowLight'>
        <div className='innerRow' id="innerRow4">
          <div id='row4col1'>
            <img id='homeBumpyBorder' src={bumpyBorder} alt="A bumpy border around the text to highlight it."/>
            <p className='homeRowLight'>Teacher accounts coming soon!</p>
          </div>
          <div id='row4col2'>
            <h2 className='homeRowLight'>Teachers</h2>
            <p className='homeRowLight'>Supplement your intro to algorithms courses with AlgorithmOcean! It&apos;s easy to create a class and assign lessons and quizzes. Fun facts about how algorithms in nature and science keep students engaged.</p>
          </div>
          <div id='row4col3'>
            <img id='homeTeacher' src={teacher} alt="An icon representing a teacher teaching."/>
          </div>
        </div>
      </div>

      <div className='homeRowDark'>
        <div className='innerRow' id="innerRow6">
          <h2>What Users Say</h2>
          <div className='col1of3'>
            <p>User quote here</p>
            <p>User quote here</p>
            <img src={portrait} id='homeSwap' alt="A symbol for swapping two numbers that looks like a curved U-shaped arrow."/>
            <p>Author, Location</p>
          </div>
          <div className='col1of3' >
            <p>User quote here</p>
            <p>User quote here</p>
            <img src={portrait} id='homeSwap' alt="A symbol for swapping two numbers that looks like a curved U-shaped arrow."/>
            <p>Author, Location</p>
          </div>
          <div className='col1of3' >
            <p>User quote here</p>
            <p>User quote here</p>
            <img src={portrait} id='homeSwap' alt="A symbol for swapping two numbers that looks like a curved U-shaped arrow."/>
            <p>Author, Location</p>
          </div>
        </div>
      </div>






    </div>
  );
}

/*
<img className='naut hideUntilHover' src={nautInside} alt="The inside of a spiral nautilus shell with split into boxes according to fibonnaci numbers, with 1 being the closest to the inside of the spiral, then 3, 5, 8, 13, 21, and 34 being the largest outside part of the spiral."/>
*/
 
export default Home;