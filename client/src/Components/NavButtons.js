import '../Stylesheets/NavButtons.css';
import { Link } from "react-router-dom";
import { AuthContext } from '../context/auth';
import { useContext } from 'react';

const NavButtons = () => {

    const { user, logout } = useContext(AuthContext)

    const authBar = user ? (
        <button className="logout" onClick = {logout}><Link to="/">Logout</Link></button>
    ) :
    (
        <div className="Nav">
            <button className="login"><Link to="/login">Login</Link></button>
            <button className="register"><Link to="/register">Register</Link></button>
        </div>
    )

    return authBar;
}
 
export default NavButtons;