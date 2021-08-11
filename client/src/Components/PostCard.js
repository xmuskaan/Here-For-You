import {Link} from 'react-router-dom';
import moment from 'moment';
import { useContext } from 'react';
import { AuthContext } from '../context/auth';
import LikeButton from './LikeButton';
import DeleteButton from './DeleteButton';

const PostCard = ( { post:{ body, createdAt , id , username, likeCount , commentCount , likes, comments } } ) => {

    const {user} = useContext(AuthContext);


    return ( 
            <div className="postCardContent">
                <div className="postHeader">
                     <div className="imageDiv">
                        <img src=" " alt = "userImage" />
                     </div>

                    <h3 className="postUser"> {username} </h3>

                </div>

                <div as={Link} to ={`/posts/${id}`}>{moment(createdAt).fromNow(true)}</div>

                <div className="postBody">
                    <p>{body}</p>
                </div>

                <div className="postButtons">
                    <LikeButton user= { user }post={{ id, likes, likeCount}}/>
                    
                    <button className="commentButton" >
                        <Link to={`/posts/${id}`}>
                            <i className="far fa-comment-alt"></i>
                        </Link>
                        <label>{commentCount}</label>
                    </button>

                    {user && user.username === username && 
                    <DeleteButton postId={id} />
                    }
                </div>
                                
            </div>

     );
}
 
export default PostCard;