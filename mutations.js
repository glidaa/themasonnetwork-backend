type Mutation {
    createNews(input: NewsInput!): News!
    updateNews(id: ID!, input: NewsInput!): News!
    deleteNews(id: ID!): Boolean!
  }
  
  input NewsInput {
    title: String!
    author: String!
    description: String!
    url: String!
    imageUrl: String!
  }
  
  type News {
    id: ID!
    title: String!
    author: String!
    description: String!
    url: String!
    imageUrl: String!
  }
  