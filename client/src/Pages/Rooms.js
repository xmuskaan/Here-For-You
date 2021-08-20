import { useQuery} from '@apollo/client';
import { AuthContext } from '../context/auth';
import  { useContext } from 'react';
import ChatBox from '../Components/ChatBox';
import MessageForm from '../Components/MessageForm';
import { FETCH_MESSAGES_QUERY } from '../utils/graphql';
import '../Stylesheets/Rooms.css';

const Rooms = () => {

    const {user} = useContext(AuthContext);

    const {loading ,data: {getMessages: messages} = {} } = useQuery(FETCH_MESSAGES_QUERY);


    return (
        <div className="Container">
            <h1>Rooms</h1>

            { user && 
             
             <MessageForm/>
             
             }
            
            {
                loading? 
                ( 
                    <h1>Loading Messages...</h1>
                )
                : 
                (
                    messages && messages.map(message => (
                        <div 
                        // className={ (user===message.username)? 'messageRec': 'messageSent'} 
                        key ={message.id}

                            // style={{
                            //     display:'flex',
                            //     justifyContent:message.username === user  ? 'flex-end' : 'flex-start'
                            // }}
                            >
                            <ChatBox message={message} />

                        </div>
                    ))
                )
            }
          
        </div>
     );

}

export default Rooms;

