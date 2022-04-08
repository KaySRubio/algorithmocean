import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className="navbar">
      <h2>Navbar</h2>
      <Link to="/">Back to the homepage...</Link>
    </div>
  );
}
 
export default Navbar;