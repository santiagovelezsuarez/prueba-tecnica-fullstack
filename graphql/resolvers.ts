import userResolvers from "./resolvers/user.resolver";
import transactionResolvers from "./resolvers/transaction.resolver";

const resolvers = {
  Query: {
    ...userResolvers.Query,
    ...transactionResolvers.Query,
  },
  Mutation: {
    ...transactionResolvers.Mutation,    
  },
};

export default resolvers;
