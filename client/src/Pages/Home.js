import {Link} from 'react-router-dom';
import socialFriends from '../Images/socialFriends.svg';
import beginChat from '../Images/beginChat.svg';
import thoughts from '../Images/thoughts.svg';
import spreadLove from '../Images/spreadLove.svg';
import '../Stylesheets/Home.css';
const Home = () => {
    
    return ( 
        <div className="Home">
            <div className="intro">
                <p className="headingText">Welcome to Here For You </p>
                <img className="mainImg" src={spreadLove} alt="spreadLove" />
                <p className="medText">A community full of love</p>

            </div>

            <div className="displayContent">
                <div className="box1">
                    <img className="medImg"src={thoughts} alt="" />
                    <p className="medText">We all feel lost sometimes and at times we have no one to talk to, share our problems with..</p>
                </div>

                <div className="box2">
                <p className="medText">Here For You is a social media platform where you could share your tips and tricksthat helps keep you and your mind healthy social friends</p>
                    <img src={socialFriends} alt="" />
                </div>
   
                <div className="box3">
                    <img src={beginChat} alt="" />
                    <p className="">At the end of the day we all need someone to talk to without judging us, <br/> So what are you waiting for? Hop in!</p>
                    <Link to="/disc"><button className="medButtons"> Get Started!</button></Link>
                </div>
                
               
            </div>

        </div>
     );
}
 
export default Home;