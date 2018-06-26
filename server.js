const { ApolloServer, gql } = require("apollo-server");
const { find, filter } = require("lodash");

const typeDefs = `
type Author {
  id: Int!
  posts: [Post] # the list of Posts by this author
}

type Post {
  id: Int!
  author: Author
}

type Query {
  post(id: Int!): Post
}
`;

const authors = [
  { id: 1, firstName: "Pierre", lastName: "Carrier" },
  { id: 2, firstName: "Pete", lastName: "Wagner" },
  { id: 3, firstName: "Joseph", lastName: "Glanville" },
  { id: 4, firstName: "Tim", lastName: "Hingston" }
];

const posts = [
  {
    id: 1,
    authorId: 1,
    title: "Introduction to GraphQL",
    votes: 2,
    state: "PUBLISHED"
  },
  {
    id: 2,
    authorId: 2,
    title: "Welcome to Apollo",
    votes: 3,
    state: "PUBLISHED"
  },
  {
    id: 3,
    authorId: 2,
    title: "Advanced GraphQL",
    votes: 1,
    state: "PUBLISHED"
  },
  {
    id: 4,
    authorId: 3,
    title: "Launchpad is Cool",
    votes: 7,
    state: "REVIEW_PENDING"
  },
  {
    id: 5,
    authorId: 4,
    title: "Mock Data is Your Friend",
    votes: 5,
    state: "DRAFT"
  }
];

const resolvers = {
  Query: {
    post: (_, { id }) => find(posts, { id })
  },
  Author: {
    posts: author => filter(posts, { authorId: author.id })
  },
  Post: {
    author: post => find(authors, { id: post.authorId })
  }
};

// In the most basic sense, the ApolloServer can be started
// by passing type definitions (typeDefs) and the resolvers
// responsible for fetching the data for those types.
const server = new ApolloServer({
  typeDefs,
  resolvers,
  engine: {
    endpointUrl: "https://engine-staging-report.apollodata.com",
    uncompressedReportSizeTarget: 4 * 1024 * 1024
  }
});

// This `listen` method launches a web-server.  Existing apps
// can utilize middleware options, which we'll discuss later.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
