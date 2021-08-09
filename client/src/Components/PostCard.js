import {Link} from 'react-router-dom';
import moment from 'moment';

const PostCard = ( { post:{ body, createdAt , id , username, likeCount , commentCount , likes, comments } } ) => {

    const commentOnPost = () => {
        console.log('commented!');
    }

    const likeOnPost = () => {
        console.log('Liked Post!');
    }

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
                    <button className="likeButton" onClick={likeOnPost}>
                        <i className="far fa-heart" />
                    <label>{likeCount}</label>
                    </button>
                    
                    <button className="commentButton" onClick={commentOnPost}>
                        <i className="far fa-comment-alt"></i>
                    <label>{commentCount}</label>
                    </button>

                </div>
                                
            </div>

     );
}
 
export default PostCard;