import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import PostCard from '../Components/PostCard';
import '../Stylesheets/Home.css';

const Home = () => {
    const { loading, data : {getPosts: posts} = {} } = useQuery(FETCH_POSTS_QUERY);


    return ( 
        <div>
            <h1>Home</h1>
            <div className='Posts'>
                {   loading ?
                    (
                        <h1>Loading Posts..</h1>
                    ) 
                    : 
                    (
                        posts && posts.map ( post => (
                            <div className="postCard" key= {post.id} >
                                <PostCard post= {post} / >
                            </div>
                    ))
                )}
            </div>
        </div>
     );
}

const FETCH_POSTS_QUERY = gql`
{
    getPosts{
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



export default Home;