import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import { FETCH_POSTS_QUERY } from '../utils/graphql';
import PostCard from '../Components/PostCard';

import moment from 'moment';
import { useParams } from 'react-router-dom';

const ProfilePage = () => {

    const {username} = useParams();
    const {data : {getPosts: posts} = {} } = useQuery(FETCH_POSTS_QUERY);

    const {data: {getUser} = {} } = useQuery(FETCH_USER_QUERY ,{
        variables: {
            username
        }
    });

    
    return (  
        <div className="profilePage">
            <h1>hi</h1>
            { getUser && (
                <div>
                      <h6>{getUser.username}</h6>
                        <h6>Member Since {moment(getUser.createdAt).fromNow(true)}</h6>
                        <h4>User Posts</h4>

                        {                              
                                    posts && posts.map ( post => {
                                        if(post.username===getUser.username){
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
              
            )}        
    
        </div>
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


