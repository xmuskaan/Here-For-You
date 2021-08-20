import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import {FETCH_MESSAGES_QUERY } from '../utils/graphql';
import { useForm } from "../utils/hooks";
const MessageForm = () => {
     
    const {values, handleSubmit, handleChange} = useForm(createCallback, {
        content:''
    });

    const [ createMessage , {error} ] = useMutation(CREATE_MESSAGE_MUTATION, {
        variables:values,
        update(proxy,result){
            const data = proxy.readQuery({
                query:FETCH_MESSAGES_QUERY
            });
            let newMessage = [...data.getMessages];
            newMessage = [result.data.createMessage, ...newMessage];
            proxy.writeQuery({ query: FETCH_MESSAGES_QUERY,
                data: {
                    ...data,
                    getMessages:{
                        newMessage,
                    }
                },
            });
            values.content='';
        }
    });
     
    function createCallback() {
        createMessage();
    }
    return ( 
        <div className="MessageForm ">
            <form onSubmit={handleSubmit}>
                <input type="text" 
                placeholder="Enter your message" 
                id="messageInput"
                value={values.content} 
                name="content"
                onChange={handleChange}/>
                <button className="sendButton">Send</button>
            </form>
        </div>
     );
}

const CREATE_MESSAGE_MUTATION = gql`
    mutation createMessage($content:String!){
        createMessage(content:$content) {
            id
            content
            username
            createdAt
        }
    }
`;

export default MessageForm;