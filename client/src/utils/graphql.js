import gql from 'graphql-tag';

export const FETCH_POSTS_QUERY = gql`
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
`;

export const FETCH_MESSAGES_QUERY = gql`
{
    getMessages{
        id
        username
        content 
        createdAt
    }
}
  
`;