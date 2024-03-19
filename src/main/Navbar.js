import { Link } from "react-router-dom";
const Navbar = () => {
    return ( 
    <nav className="navbar">
      <h1><Link className="navbar-label" to="/">Vehicle counting</Link></h1>
      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/">Add cam</Link>
        <Link to="/">Statistic</Link>
      </div>
    </nav>
    );
}
 
export default Navbar;