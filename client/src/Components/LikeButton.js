import { useEffect, useState } from "react";
import {Link} from 'react-router-dom';
import {useMutation} from '@apollo/client';
import gql from 'graphql-tag';
import '../Stylesheets/LikeButton.css';
import favoriteIcon from '../Images/favoriteIcon.svg';
import favoriteoutlined from '../Images/favoriteoutlined.svg';

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
        //    <img src={favoriteIcon} alt="" style={{width:"18px"}}/>
            <i className="fas fa-heart" style={{color: "#c93c55"}}  /> 
       ):
            // <img src={favoriteoutlined} alt="" style={{width:"18px"}}/>
            <i className="far fa-heart" /> 
        ) : 
    (
     <Link to="/RegisterLogin">  <img src={favoriteoutlined} alt="" style={{width:"18px"}}/></Link>
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