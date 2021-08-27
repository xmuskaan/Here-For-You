import moment from 'moment';
import '../Stylesheets/ChatBox.css';

const ChatBox = ({message: {username, createdAt , content}}) => {
  
    
    return ( 
        <div className="chatBox" >
                <div className="title">
                    <h4>{username} <span>{moment(createdAt).fromNow(true)} ago</span></h4>
                </div>
                
                <div className="body">
                    <p> {content}</p>
                </div>
                            
        </div>
     );
}
 
export default ChatBox;