import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import {Link } from 'react-router-dom';
import moment from 'moment';
import { AuthContext } from '../context/auth';
import { useContext } from 'react';
import LikeButton from '../Components/LikeButton';
import DeleteButton from '../Components/DeleteButton'


const SinglePost = (props) => {
    
    const postId = props.match.params.postId;
    console.log(postId);
    const {user} = useContext(AuthContext);
    const {data: {getPost} } = useQuery(FETCH_POST_QUERY,{
        variables: {
            postId
        }
    })
    
    let postMarkup;
    if(!getPost) {
        postMarkup= <p>Loading Post...</p>
    }
    else {
        const { id, body , createdAt , username , comments, likes, likeCount , commentCount} = getPost;

        postMarkup = (
            <div>
                <div className="postHeader">
                     <div className="imageDiv">
                        <img src=" " alt = "userImage" />
                     </div>

                    <h3 className="postUser"> {username} </h3>

                </div>

                 <div>{moment(createdAt).fromNow(true)}</div>

                <div className="postBody">
                    <p>{body}</p>
                </div>

                <div className="postButtons">
                    <LikeButton user= { user }post={{ id, likes, likeCount}}/>
                    
                    <button className="commentButton" onClick= {()=>{console.log('comment on post')}} >
                        <Link to={`/posts/${id}`}>
                            <i className="far fa-comment-alt"></i>
                        </Link>
                        <label>{commentCount}</label>
                    </button>

                    {user && user.username === username && <DeleteButton postId={id} />
                    }
                </div>
            </div>
        )
    }



    return postMarkup;
}

const FETCH_POST_QUERY = gql`
    query($postId: ID!) {
        getPost(postId : $postId){
            id body createdAt username likeCount
            likes{
                username
            }
            commentCount
            comments{
                id username createdAt body
            }
        }
    }
`


export default SinglePost;