import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home">
        <h1>Home</h1>
        <Link className="link" to="/lesson/bubble">Bubble Sort</Link>
        <br />
        <Link className="link" to="/lesson/insertion">Insertion Sort</Link>
        <br />
        <Link className="link" to="/lesson/selection">Selection Sort</Link>
    </div>
  );
}
 
export default Home;