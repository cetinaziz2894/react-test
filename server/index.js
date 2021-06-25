const { ApolloServer } = require("apollo-server");

// Construct a schema, using GraphQL schema language
const typeDefs = `
  type Product {
    id: Int
    title: String
    price: String
    currency: String
    shippmentState: String
    isFavorite: Boolean
    imgName: String
  }

  type Query {
    products:[Product]
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    products: () => {
      const results = require('./products.json');
      const products = results;
      return products.data.products;
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
