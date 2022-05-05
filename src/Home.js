import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home">
        <h1>Home</h1>
        <p id="temphome">Try a sorting algorithm:
          <br />
          <br />
          <Link className="link" to="/lesson/bubble">Bubble Sort</Link>
          <br />
          <Link className="link" to="/lesson/insertion">Insertion Sort</Link>
          <br />
          <Link className="link" to="/lesson/selection">Selection Sort</Link>
        </p>
    </div>
  );
}
 
export default Home;