import React from 'react';
import App from './App';
import { ApolloClient, InMemoryCache, createHttpLink, ApolloProvider} from "@apollo/client";
import { setContext } from 'apollo-link-context';
//import { WebSocketLink } from '@apollo/client/link/ws';

// const wsLink = new WebSocketLink({
//     uri: 'ws://localhost:5000/graphql',
//     options:{
//         reconnect:true
//     },
// });

const httpLink = createHttpLink({
    uri:'http://localhost:5000'
})

//Authorization headers 
const authLink = setContext(() => {
    const token = localStorage.getItem('jwtToken');
    return {
        headers:{
            Authorization:token? `Bearer ${token}` : ``
        }
    }
})

const client = new ApolloClient({
    // wsLink,
    link: authLink.concat(httpLink),
    cache: new InMemoryCache({
        typePolicies: {
            Post: {
              fields: {
                likes: {
                  merge: false,
                },
              },
            },
          },
    })
});



export default (
    <ApolloProvider client= {client}>
        <App/>
    </ApolloProvider>
)