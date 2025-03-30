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
  }
`;

export { userDefs };