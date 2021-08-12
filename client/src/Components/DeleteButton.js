import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import { useState } from 'react';
import Modal from './Modal';

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

    const [openModal, setOpenModal] = useState(false);

    return ( 
        (   
            <>
            <button className="deleteButton" onClick={()=> setOpenModal(true)} >
                <i className="far fa-trash-alt"></i>
            </button>

                {/*  If openModal is true display modal ; conditional rendering */}
              { openModal && <Modal closeModal= {setOpenModal} deletePost={deletePost}/> } 
              
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