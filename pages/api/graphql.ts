import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { makeExecutableSchema } from '@graphql-tools/schema';
import resolvers from '@/graphql/resolvers';
import typeDefs from '@/graphql/schema';
import { authOptions } from "./auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import { NextApiRequest, NextApiResponse } from "next";

export const schema = makeExecutableSchema({ typeDefs, resolvers });

const server = new ApolloServer({ schema });

export default startServerAndCreateNextHandler(server, {
  context: async (req: NextApiRequest, res: NextApiResponse) => {    
    
    const session = await getServerSession(req, res, authOptions);   

    return {
      req,
      res,
      session
    };
  },
});