import '../Stylesheets/SideBar.css';
import {Link} from 'react-router-dom';


const SideBar = () => {
    return ( 
        <div className="SideBar">

            <h4 className="title"> HFY </h4>

            <div className="SideBarMain">
                <h6><Link to="/">Home</Link></h6>
                <h6><Link to="/">Rooms</Link></h6>
                <h6><Link to="/">Discussions</Link></h6>
            </div>

            <div className="user">
                <h6><Link to="/">Notifications</Link></h6>
                <h6><Link to="/">Profile</Link></h6>
            </div>
        </div>
     );
}
 
export default SideBar;

