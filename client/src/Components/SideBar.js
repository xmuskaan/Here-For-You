import '../Stylesheets/SideBar.css';
import {Link} from 'react-router-dom';
import { AuthContext } from '../context/auth';
import { useContext} from 'react';
import rating from '../Images/rating.png';
import romantic from '../Images/romantic.png';

const SideBar = () => {

    const { user } = useContext(AuthContext)

    

    return ( 
        <div className="SideBar">

            <h4 className="title"> HFY </h4>

            <div className="SideBarMain">
                <h6> <Link to="/"> <img src="" alt="Home" className="sidebarImg"/ > </Link> </h6>
                <h6> <Link to="/disc"> <img src={rating} alt="Discussion"className="sidebarImg"/>  </Link> </h6>
                <h6> <Link to="/rooms"> <img src={romantic} alt="Rooms"className="sidebarImg"/>  </Link> </h6>
                
            </div>

            { user ? (
                 <div className="user">
                     <h6><Link to="/">Notifications</Link></h6>
                     <Link to= {`/${user}`}><h6>Profile</h6></Link>
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

