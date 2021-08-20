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
                    const message = await Message.find().sort({ createdAt : -1});
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
                throw new Error('Message must not be empty');
            }

            const newMessage = new Message({
                content,
                user: user.indexOf,
                username:user.username,
                createdAt: new Date().toISOString()
            });
            const message = await newMessage.save();

            // subscription
            // context.pubsub.publish('NEW_MESSAGE', {
            //     messages: message
            // })
            subscribers.forEach(fn => fn());

            return message;
        }
    },

    Subscription: {
        messages: {
            subscribe :(_,__,{ pubsub }) => {
                const channel = Math.random().toString(36).slice(2,15);
                onMessagesUpdates(() => pubsub.publish(channel , { messages} ));
                setTimeout(() => pubsub.publish(channel , { messages} ) ,0);
                return pubsub.asyncIterator(channel); 

                // return pubsub.asyncIterator('NEW_MESSAGE'); 
            },
        }
    }

}