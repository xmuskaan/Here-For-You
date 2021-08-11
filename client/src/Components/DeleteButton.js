import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import {Confirm} from 'semantic-ui-react';
import { useState } from 'react';


const DeleteButton = ({postId}) => {
    
    const [confirmOpen, setConfirmOpen] = useState(false);

    const [deletePost] = useMutation(DELETE_POST_MUTATION, {
        update() {
            setConfirmOpen(false);
            // !!remove post from cache
        },
        variables: {
            postId
        }
    })

    return ( 
        (   
            <>
            <button className="deleteButton" onClick={()=> setConfirmOpen(true)} >
                <i className="far fa-trash-alt"></i>
            </button>
            <Confirm
                open={confirmOpen}
                onCancel={()=> setConfirmOpen(false)}
                onConfirm={deletePost}
            />
            </>
        )
     );
}

const DELETE_POST_MUTATION = gql`
    mutation deletePost($postId: ID!){
        deletePost(postId: $postId)
    }
`

export default DeleteButton;