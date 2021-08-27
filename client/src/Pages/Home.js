import { useQuery } from '@apollo/client';
import PostCard from '../Components/PostCard';
import '../Stylesheets/Home.css';
import {AuthContext} from '../context/auth';
import { useContext } from 'react';
import PostForm from '../Components/PostForm';
import { FETCH_POSTS_QUERY } from '../utils/graphql';

const Home = () => {
    const {user} = useContext(AuthContext);

    const { loading, data : {getPosts: posts} = {} } = useQuery(FETCH_POSTS_QUERY);

   
    return ( 
        <div>
            <h1>Home</h1>
            <div className='Posts'>
                {
                    user &&
                    
                        <PostForm/>
                    
                }
                
                {   loading ?
                    (
                        <h1>Loading Posts..</h1>
                    ) 
                    : 
                    (
                        posts && posts.map ( post => (
                            <div className="postCard" key= {post.id} >
                                
                                <PostCard 
                                    post= {post} 
                                />
                            </div>
                    ))
                )}
          
            </div>
        </div>
     );
}





export default Home;