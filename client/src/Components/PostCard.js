import {Link} from 'react-router-dom';
import moment from 'moment';
import { useContext } from 'react';
import { AuthContext } from '../context/auth';
import LikeButton from './LikeButton';
import DeleteButton from './DeleteButton';
import { useHistory } from 'react-router';
import '../Stylesheets/PostCard.css';

const PostCard = ( { post:{ body, createdAt , id , username, likeCount , commentCount , likes } }  ) => {

    const {user} = useContext(AuthContext);
 
    const history = useHistory();

    function deletePostCallback(){
        history.push('/');
        window.location.reload()
    }

    return ( 
            <div className="postCardContent" as={Link} to ={`/posts/${id}`}> 
                <div className="postHeader" > 
                    <Link to={`/${username}`}>
                        <div className="imageDiv">
                            <img src=" " alt = "userImage" />
                        </div>
                        <h3 className="postUser"> {username} </h3> 
                    </Link>
                </div>

                <div> 
                    <p>{moment(createdAt).fromNow(true)} ago</p>
                   
                </div>

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
                    <DeleteButton postId={id} callback={deletePostCallback}/>
                    }
                </div>
                                
            </div>

     );
}
 
export default PostCard;