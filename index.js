const {ApolloServer} = require('apollo-server');
const {PubSub} = require('graphql-subscriptions');
const mongoose = require('mongoose');
// import {express} from "express";

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
const{ MONGODB } = require('./config');

const pubsub = new PubSub();

//subscription
// import { createServer } from 'http';
// import { execute, subscribe } from 'graphql';
// import { SubscriptionServer } from 'subscriptions-transport-ws';
// import { makeExecutableSchema } from '@graphql-tools/schema';


// (async function () {
//     const app = express();
  
//     const httpServer = createServer(app);
  
//     const schema = makeExecutableSchema({
//       typeDefs,
//       resolvers,
//     });
  
//     const server = new ApolloServer({
//       schema,
//       context: ({ req }) => ({ req , pubsub })
//     });
//     await server.start();
//     server.applyMiddleware({ app });
  
//     SubscriptionServer.create(
//       { schema, execute, subscribe },
//       { server: httpServer, path: server.graphqlPath }
//     );
  
//     const PORT = 4000;
//     httpServer.listen(PORT, () =>
//       console.log(`Server is now running on http://localhost:${PORT}/graphql`)
//     );
//   })();


const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req , pubsub })
});

mongoose.connect(MONGODB, { useNewUrlParser:true })
    .then(()=> {
        console.log('MongoDB Connected');
        return server.listen({port: 5000});
    })
    .then((res) => {
        console.log(`Server running at ${res.url}`);
}); 