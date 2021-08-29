const Message = require('../../models/Message');
const checkAuth = require('../../utils/check-auth');

// RESOLVERS 
const messages=[
    {content: '',
    createdAt: '',
    user:'',
}

];
const subscribers =[];
const onMessagesUpdates = (fn) => subscribers.push(fn);
module.exports= {
    // Query: {
    //     async getMessages(){
    //         try{
    //             const message = await Message.find();
    //             return message;
    //         } 
    //         catch (err) {
    //             throw new Error(err); 
    //         }
    //     }
    // },

    // Mutation: {
    //     async createMessage(_, { content }, context) {
    //         const user = checkAuth(context);
            
    //         if(content.trim() === ''){
    //             throw new Error('Message body must not be empty');
    //         }

    //         const newMessage = new Message({
    //             content,
    //             user: user.id,
    //             username:user.username,
    //             createdAt: new Date().toISOString()
    //         });
    //         const message = await newMessage.save();
    //         context.pubsub.publish('NEW_MESSAGE', {
    //             newMessage: message
    //           });
    //         return message;
    //     },
    // },

    // Subscription: {
    //     newMessage: {
    //       subscribe: (_, __, { pubsub }) => pubsub.asyncIterator('NEW_MESSAGE')
    //     }
    // }

    Query : {
        getMessages: () => {
           
            messages.pop();
        }

    },
    Mutation: {
        createMessage : (parent,{content},context) => {
            const user=checkAuth(context);

            const id= messages.length;
            messages.push({
                id, 
                user,
                content
            });
            subscribers.forEach((fn) => fn());
            return id;
        }
    },
    Subscription: {
        newMessage: {
            subscribe: (parent, args, {pubsub}) => {
                const channel = Math.random().toString(36).slice(2,15);
                onMessagesUpdates(() => pubsub.publish(channel, { messages }) );
                setTimeout(() =>pubsub.publish(channel, { messages }),0 );
                return pubsub.asyncIterator(channel);
            },
        }
    }
    
};