import '../Stylesheets/SideBar.css';
import {Link} from 'react-router-dom';
import { AuthContext } from '../context/auth';
import { useContext} from 'react';
import love from '../Images/love.png';
import people from '../Images/people.png';
import home from '../Images/home.png';
import userpic from '../Images/user.png';

const SideBar = () => {

    const { user } = useContext(AuthContext)

    

    return ( 
        <div className="SideBar">

            <p className="title"> HFY </p>

            <div className="SideBarMain">
                <h6> <Link to="/"> <img src={home} alt="Home" className="sideBarImg"/ > </Link> </h6>
                <h6> <Link to="/disc"> <img src={people} alt="Discussion"className="sideBarImg"/>  </Link> </h6>
                <h6> <Link to="/rooms"> <img src={love} alt="Rooms"className="sideBarImg"/>  </Link> </h6>
                
            </div>

            { user ? (
                 <div className="user">
                     <Link to= {`/${user}`}> <img src={userpic} alt={userpic} className="sideBarImg" /> </Link>
                </div>
            )
            :
            (
                <div></div>
            )
        }
        </div>
     );
}
 
export default SideBar;

