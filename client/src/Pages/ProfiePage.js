import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import { FETCH_POSTS_QUERY } from '../utils/graphql';
import PostCard from '../Components/PostCard';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import '../Stylesheets/ProfilePage.css';

const ProfilePage = () => {

    const {username} = useParams();
    const {data : {getPosts: posts} = {} } = useQuery(FETCH_POSTS_QUERY);

    const {data: {getUser} = {} } = useQuery(FETCH_USER_QUERY ,{
        variables: {
            username
        }
    });


    let profileMarkup;

    if(posts && getUser) {
        profileMarkup = 
        (
            <div className="profilePage">
                <div>
                    <div className="userInfo">
                        <h6 className="headingTextPf"> {getUser.username} </h6>
                        <p className="smallText"> Member Since {moment(getUser.createdAt).fromNow(true)} </p>
                        <p className="medTextHeading"> {getUser.username}'s Posts </p>
                    </div>
                   
                    {                             
                        posts && posts.map ( post => {
                            if(post.username===getUser.username)
                            {
                                return (
                                        <div className="postCard" key= {post.id} >
                                            <PostCard post= {post} />
                                        </div>
                                    )
                            }
                            return null;
                        })
                    }  
                </div>
            </div>
        );
    }

    else {
        return null;
    }

    return (  
        profileMarkup                      
    );
}

const FETCH_USER_QUERY = gql`
    query($username:String!) {
        getUser(username : $username){
            id createdAt username 
        }
    }
`;

export default ProfilePage;


