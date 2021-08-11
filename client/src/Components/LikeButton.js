import { useEffect, useState } from "react";
import {Link} from 'react-router-dom';
import {useMutation} from '@apollo/client';
import gql from 'graphql-tag';
import '../Stylesheets/LikeButton.css';

const LikeButton = ({user , post: {id, likes, likeCount} }) => {
    
    const[liked,setLiked] = useState(false);
    
    const [likePost] = useMutation(LIKE_POST_MUTATION ,{
        variables: {postId: id}
    });
    
    useEffect(() => {
        if(user && likes.find((like) => like.username === user.username)){
            setLiked(true);
        }
        else {  setLiked(false);
        } 
    }, [ user, likes]);
   
   const likeButton = user ? (
       liked ? (
            <i className="fas fa-heart" /> 
       ):
            <i className="far fa-heart"  /> ) : 
    (
     <Link to="/login"> <i className="far fa-heart" /> </Link>
    )
   
    return ( 
        <button className="likeButton" onClick={() =>{if(user) {likePost();}} }>
            {likeButton}
            <label>{likeCount}</label>
        </button>
     );
}

const LIKE_POST_MUTATION = gql`
    mutation likePost( $postId : ID!) {
        likePost(postId : $postId) {
            id 
            likes{
                id username
            }
            likeCount
        }
    }
`
export default LikeButton;