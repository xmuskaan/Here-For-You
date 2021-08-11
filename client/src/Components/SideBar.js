import '../Stylesheets/SideBar.css';
import {Link} from 'react-router-dom';
import { AuthContext } from '../context/auth';
import { useContext} from 'react';

const SideBar = () => {

    const { user } = useContext(AuthContext)

    

    return ( 
        <div className="SideBar">

            <h4 className="title"> HFY </h4>

            <div className="SideBarMain">
                <h6><Link to="/">Home</Link></h6>
                <h6><Link to="/">Rooms</Link></h6>
                <h6><Link to="/">Discussions</Link></h6>
            </div>

            { user ? (
                 <div className="user">
                     <h6><Link to="/">Notifications</Link></h6>
                    <h6><Link to="/">Profile</Link></h6>
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

