import moment from 'moment';

const ChatBox = ({message: {username, createdAt , content}}) => {
  
    
    return ( 
        <div className="ChatBox" >
                <h4>{username}</h4>
                <p>{content}</p>
                <p>{moment(createdAt).fromNow(true)} ago</p>
        </div>
     );
}
 
export default ChatBox;