import userResolvers from "./resolvers/user.resolver";

const resolvers = {
  Query: {
    ...userResolvers.Query
  },
//   Mutation: {
    
//   },
};

export default resolvers;
