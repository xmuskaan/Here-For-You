const { gql } = require('apollo-server');

module.exports = gql`
    type Post{
        id:ID!
        body:String!
        createdAt:String! 
        username:String!   
        comments:[Comment]!
        likes:[Like]!
        likeCount: Int!
        commentCount: Int!
    }

    type Comment{
        id:ID! 
        createdAt:String!
        username:String! 
        body:String!
    }

    type Like{
        id:ID!
        username:String!
        createdAt:String! 
    }

    # Chat 
    type Message{
        id:ID! 
        username:String! 
        content: String!
        createdAt:String!
    }
    
    # type Room{
    #     id:ID!
    #     username:String!
    #     title:String!
    #     Chat:Message
    # }
    
    type About{
        aboutBody:String!
        username:String! 
        id: ID!
    }

    type User{
        id:ID! 
        email:String! 
        token: String! 
        username: String! 
        createdAt: String!
    }

    input RegisterInput{
        username:String!
        password:String!
        confirmPassword:String! 
        email:String!
    }


    type Query{
        getPosts: [Post]
        getPost(postId: ID!): Post
        getMessages: [Message]
        getUser(username: String!) : User
        getAbout(aboutId:ID!) : About
        # getRooms: [Room]
    }

    type Mutation{
        register(registerInput: RegisterInput) :User!
        login(username:String! , password: String!): User!
        createPost(body: String!) : Post!
        deletePost(postId:ID!): String!
        createComment(postId:ID!, body:String!):Post!
        deleteComment(postId:ID!, commentId:ID!):Post!
        likePost(postId:ID!):Post!  
        createMessage(content:String!): ID!
        createAbout(aboutBody:String!):About
    }

    type Subscription{
        messages: [Message!]
        newPost: Post!
    }

`;