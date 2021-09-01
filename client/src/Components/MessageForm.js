import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import { useForm } from "../utils/hooks";
import { useState } from "react";

const MessageForm = () => {
     
    const {values, handleSubmit, handleChange} = useForm(createCallback, {
        content:''
    });

    const [state, setState] = useState({
        content:'',
    })

    // const [ createMessage , {error} ] = useMutation(CREATE_MESSAGE_MUTATION, {
    //     variables:values,
    //     update(proxy,result){
    //         const data = proxy.readQuery({
    //             query:FETCH_MESSAGES_QUERY
    //         });
    //         let newMessage = [...data.getMessages];
    //         newMessage = [result.data.createMessage, ...newMessage];
    //         proxy.writeQuery({ query: FETCH_MESSAGES_QUERY,
    //             data: {
    //                 ...data,
    //                 getMessages:{
    //                     newMessage,
    //                 }
    //             },
    //         });
    //         values.content='';
    //     }
    // });

    const [createMessage] = useMutation(CREATE_MESSAGE_MUTATION);
    
    const onSend = (e) => {
        if(state.content.length > 0){
            createMessage({
                varaibles:state,
            });
        }
        setState({
            ...state,
            content:'',
        })
        e.preventDefault();
    }
    function createCallback() {
        createMessage();
    }
    return ( 
        <div className="MessageForm ">
            <form>
                <textarea 
                placeholder="Enter your message" 
                id="messageInput"
                value={values.content} 
                name="content"
                    onChange={(e) => setState({
                        ...state,
                        content: e.target.value,
                        }
                    )}
                />
                <button onClick={onSend} className="sendButton">Send</button>
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