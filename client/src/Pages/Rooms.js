import { useSubscription, 
 //   useQuery
} from '@apollo/client';
// import { AuthContext } from '../context/auth';
// import  { useContext } from 'react';
//import ChatBox from '../Components/ChatBox';
//import MessageForm from '../Components/MessageForm';
import gql from 'graphql-tag';
import '../Stylesheets/Rooms.css';
//import { Link } from 'react-router-dom';
//import { FETCH_MESSAGES_QUERY } from '../utils/graphql';

const Rooms = () => {

    //const {user} = useContext(AuthContext);

    // const { loading, data : { getMessages : message } = {} } = useQuery(FETCH_MESSAGES_QUERY);
    // console.log(message)
    const {  data } = useSubscription(NEW_MESSAGE_SUBSCRIPTION);
    console.log( data);
    if(!data){return null;}

    return (
        <div className="container">
            <h1>Rooms</h1>
            <h2>We'll be updating this section soon!</h2>
            {/* {user?
                    (
                        <div className="chatContainer">
                        {
                            loading? 
                            ( 
                                <h1>Loading Messages...</h1>
                            )
                            : 
                            (   
                                    data.messages && data.messages.map(message => (
                                        <div key ={message.id} className={ message.username === user.username ? 'sentUser' : 'recUser'} >
                                            <ChatBox message={message} />
                                        </div>
                                    ))
                            
                            )
                        }
                        </div>
                    )
                    :
                    (
                        
                        <Link to='/login'><p>Please Login to continue</p></Link>
                    )
            }   
            { user && 
                    <MessageForm/>
            }*/}
          
        </div> 
     );

}

const NEW_MESSAGE_SUBSCRIPTION = gql`
    subscription {
        messages{
            id
            username
            createdAt
            content
        }
    }
`;


export default Rooms;

