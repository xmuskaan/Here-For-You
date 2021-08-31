import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import { useState } from 'react';
import Modal from './Modal';
import {FETCH_POSTS_QUERY} from '../utils/graphql';
import deleteIcon from '../Images/deleteIcon.svg';

const DeleteButton = ({postId, callback, commentId}) => {
    
    const [openModal, setOpenModal] = useState(false);
    const mutation = commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION;

    const [deletePostOrComment] = useMutation(mutation, {
        update() {
            setOpenModal(false);
        //    if(!commentId){
        //     const data = proxy.readQuery({
        //         query: FETCH_POSTS_QUERY
        //     });
        //     data.getPosts = data.getPosts.filter(p => p.id !== postId);
        //     proxy.writeQuery({ query:FETCH_POSTS_QUERY, data }); 
        //    }
            
           if(callback) callback();
        },
        variables: {
            postId,
            commentId
        }
    });



    return ( 
        (   
            <>
            <button className="deleteButton" onClick={()=> setOpenModal(true)} >
                {/* <i className="far fa-trash-alt">deleteIcon</i> */}
                <img src={deleteIcon} alt="" style={{width:"20px"}}/>
            </button>

                {/*  If openModal is true display modal ; conditional rendering */}
              { openModal && <Modal closeModal= {setOpenModal} deletePost={deletePostOrComment}/> } 
              
            </>
        )
     );
}

const DELETE_POST_MUTATION = gql`
    mutation deletePost($postId: ID!){
        deletePost(postId: $postId)
    }
`;

const DELETE_COMMENT_MUTATION = gql`
    mutation deleteComment($postId:ID!, $commentId:ID!){
        deleteComment(postId:$postId, commentId:$commentId){
            id
            comments{
                username id createdAt body
            }
            commentCount
        }
    }
`;
export default DeleteButton;