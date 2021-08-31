import { useForm } from '../utils/hooks';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import {FETCH_POSTS_QUERY} from '../utils/graphql';
import '../Stylesheets/PostForm.css';

const PostForm = () => {
    
    const {values, handleSubmit, handleChange} = useForm(createPostCallback, {
        body:''
    });

    const[ createPost, {error} ] = useMutation(CREATE_POST_MUTATION,{
        variables: values,
        update(proxy, result){
            const data = proxy.readQuery({
                query: FETCH_POSTS_QUERY
            });
            let newData = [...data.getPosts];
            newData = [result.data.createPost, ...newData];
            proxy.writeQuery({ query:FETCH_POSTS_QUERY, 
                data:{
                    ...data,
                    getPosts:{
                        newData,
                    },
                },
            });
            values.body='';
        }
    });

    function createPostCallback() {
        createPost();
    }
    return ( 
        <div className="postForm">
            <form onSubmit={handleSubmit}>
            
                <label htmlFor="body" id="labelInput">Create a post:</label>
                <br/>
                <textarea type="text"
                    id="body" 
                    placeholder="Heyaa..." 
                    value={values.body} 
                    name="body"
                    error={error ? true : false}
                    onChange={handleChange} />
                <br/>
                <button className='smallButtons' type="submit" disabled={values.body===''}>Submit</button>
            </form>
            {error && (
                <div className="errorMessage">
                    <ul className="list">
                        <li>{error.graphQLErrors[0].message}</li>
                    </ul>
                </div>
            )}
        </div>
     );
}

const CREATE_POST_MUTATION = gql`
mutation createPost($body:String!){
    createPost(body:$body){
        id
        body
        createdAt
        username
        likes{
            id username createdAt
        } likeCount
        comments{
            id body username createdAt
        } commentCount
    }
}
`
export default PostForm;