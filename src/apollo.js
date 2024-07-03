import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client/core';
import VueApollo from 'vue-apollo';
import fetch from 'node-fetch';

const httpLink = new HttpLink({
  uri: process.env.VUE_APP_GRAPHQL_HTTP,
  fetch,
});
const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
});

export default apolloProvider;
