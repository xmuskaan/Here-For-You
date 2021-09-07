const postsResolvers = require('./posts');
const usersResolvers = require('./users');
const commentsResolvers = require('./comments');
const messagesResolvers = require('./Messages');
const roomResolvers = require('./Rooms');
const aboutResolvers= require('./about');

module.exports = {
    Post: {
        likeCount: (parent) => parent.likes.length ,
        commentCount : (parent) => parent.comments.length
    },
    Query :{
        ...postsResolvers.Query,
        ...messagesResolvers.Query,
        ...usersResolvers.Query,
        ...aboutResolvers.Query
    },
    Mutation : {
        ...usersResolvers.Mutation,
        ...postsResolvers.Mutation,
        ...commentsResolvers.Mutation,
        ...messagesResolvers.Mutation,
        ...aboutResolvers.Mutation
    },
    Subscription : {
        ...messagesResolvers.Subscription,
        ...postsResolvers.Subscription
    }
};