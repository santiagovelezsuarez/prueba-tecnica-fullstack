import { gql } from 'graphql-tag';

const transactionDefs = gql`
  type Transaction {
    id: ID!
    amount: Float!
    date: String!
    description: String
    type: TransactionType!
  }
  
  enum TransactionType { INCOME EXPENSE }

  type Query {
    transactions: [Transaction!]!
  }
`;

export { transactionDefs };