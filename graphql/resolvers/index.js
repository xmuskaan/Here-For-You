const postsResolvers = require('./posts');
const usersResolvers = require('./users');
const commentsResolvers = require('./comments');
const messagesResolvers = require('./Messages');
const roomResolvers = require('./Rooms');

module.exports = {
    Post: {
        likeCount: (parent) => parent.likes.length ,
        commentCount : (parent) => parent.comments.length
    },
    Query :{
        ...postsResolvers.Query,
        ...messagesResolvers.Query,
        ...usersResolvers.Query
    },
    Mutation : {
        ...usersResolvers.Mutation,
        ...postsResolvers.Mutation,
        ...commentsResolvers.Mutation,
        ...messagesResolvers.Mutation
    },
    Subscription : {
        ...messagesResolvers.Subscription,
        ...postsResolvers.Subscription
    }
};