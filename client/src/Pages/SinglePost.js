import gql from 'graphql-tag';
import { useQuery,useMutation } from '@apollo/client';
import {Link, useParams } from 'react-router-dom';
import moment from 'moment';
import { AuthContext } from '../context/auth';
import  { useContext, useState } from 'react';
import LikeButton from '../Components/LikeButton';
import DeleteButton from '../Components/DeleteButton'
import { useHistory } from 'react-router';

const SinglePost = () => {
    
    const {postId} = useParams();
      
    const {user} = useContext(AuthContext);
    
    const {data: {getPost} = {} } = useQuery(FETCH_POST_QUERY,{
        variables: {
            postId
        }
    });

    const[comment,setComment] = useState('');

    const [submitComment] = useMutation(SUBMIT_COMMENT_MUTATION,{
        update(){
            setComment('');
        },
        variables :{
            postId,
            body:comment
        }
    })

    const history = useHistory();

    function deletePostCallback(){
        history.push('/');
        window.location.reload()
    }


    let postMarkup;
    if(!getPost) {
        postMarkup = <p>Loading Post... </p>
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

                    {user && user.username === username && (
                    <DeleteButton postId={id} callback={deletePostCallback}/>

                    )}
                </div>
                
                {user && (
                    <div className="comment">
                        <p>Comment</p>
                        <input type="text" placeholder="Comment.." value={comment} onChange={e => setComment(e.target.value)}/>
                        <button type="submit" disabled={comment.trim() ===''} onClick={submitComment}>
                            Submit
                        </button>
                    </div>
                  


                )}
                <div className="postComments">
                    {comments.map( comment => {
                        return <div className="commentContainer" key={comment.id}>
                            {user && user.username === comment.username &&(
                                <DeleteButton postId={id}  commentId={comment.id}  />
                            )}
                            <div className="commentHeader">
                                <h4>{comment.username}</h4>
                                <p>{moment(comment.createdAt).fromNow()}</p>
                            </div>

                            <div className="commentBody">
                                <p>{comment.body}</p>
                            </div>
                        </div>
                    })}
                </div>

            </div>
        );
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
`;

const SUBMIT_COMMENT_MUTATION= gql `
    mutation($postId: ID!, $body:String!){
        createComment(postId: $postId, body:$body){
            id
            comments{
                id username body createdAt
            }
            commentCount
        }
    }
`


export default SinglePost;