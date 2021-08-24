const { AuthenticationError, UserInputError } = require('apollo-server');
const Message = require('../../models/Message');
const checkAuth = require('../../utils/check-auth');




//Subscriptions:-
const subscribers = [];
const onMessagesUpdates = (fn) => subscribers.push(fn);

// RESOLVERS 

module.exports= {
    Query: {
        async getMessages(){
            try{
                const message = await Message;
                return message;
            } 
            catch (err) {
                throw new Error(err); 
            }
        }
    },

    Mutation: {
        async createMessage(_, { content }, context) {
            const user = checkAuth(context);
            
            if(content.trim() === ''){
                throw new Error('Message body must not be empty');
            }

            const newMessage = new Message({
                content,
                user: user.id,
                username:user.username,
                createdAt: new Date().toISOString()
            });
            const message = await newMessage.save();
            context.pubsub.publish('NEW_MESSAGE', {
                newMessage: message
              });
            return message;
        },
    },

    Subscription: {
        newMessage: {
          subscribe: (_, __, { pubsub }) => pubsub.asyncIterator('NEW_MESSAGE')
        }
    }
    
};