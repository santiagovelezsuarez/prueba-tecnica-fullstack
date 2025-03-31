import { gql } from 'graphql-tag';

const userDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!    
    role: Role!
  }
  
  enum Role { ADMIN USER }

  type Query {
    users: [User!]!
    user(id: ID!): User!
  }

  type Mutation {    
    updateUser(id: ID!, name: String, role: Role): User!    
  }
`;

export { userDefs };