import '../Stylesheets/NavButtons.css';
import { Link } from "react-router-dom";
import { AuthContext } from '../context/auth';
import { useContext } from 'react';

const NavButtons = () => {

    const { user, logout } = useContext(AuthContext)

    const authBar = user ? (
        <div className="loggedIn">
            <p className="welcomeText">Welcome Back {user.username}</p>
            <Link to="/"><button className="logout smallButtons" onClick = {logout}>Logout</button></Link>
        </div>
    ) :
    (
        <div className="Nav">
            
            <Link to="/RegisterLogin"><button className="login smallButtons">Login</button></Link>
            <Link to="/RegisterLogin"><button className="register smallButtons">Register</button></Link>
        </div>
    )

    return authBar;
}
 
export default NavButtons;