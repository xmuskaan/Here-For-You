import '../Stylesheets/NavButtons.css';
import { Link } from "react-router-dom";

const NavButtons = () => {
    return ( 
        <div className="Nav">
            <button className="login"><Link to="/login">Login</Link></button>
            <button className="register"><Link to="/register">Register</Link></button>
        </div>
     );
}
 
export default NavButtons;