import { gql } from 'graphql-tag';

const transactionDefs = gql`
  type Transaction {
    id: ID!    
    amount: Float!
    date: String!
    description: String
    type: TransactionType!
    user: User!
  }
  
  enum TransactionType { INCOME EXPENSE }

  type Query {
    transactions(startDate: String, endDate: String): [Transaction!]!
  }

  type Mutation {
    addTransaction(amount: Float!, date: String!, description: String, type: TransactionType!): Transaction!    
  }
`;

export { transactionDefs };