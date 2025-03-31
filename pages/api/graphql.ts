import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { makeExecutableSchema } from "@graphql-tools/schema";
import resolvers from "@/graphql/resolvers";
import typeDefs from "@/graphql/schema";
import { authOptions } from "./auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import { NextApiRequest, NextApiResponse } from "next";
import nextCors from "nextjs-cors"; // 📌 Importa nextjs-cors

export const schema = makeExecutableSchema({ typeDefs, resolvers });

const server = new ApolloServer({ schema });

const handler = startServerAndCreateNextHandler(server, {
  context: async (req: NextApiRequest, res: NextApiResponse) => {
    await nextCors(req, res, {
      origin: "*",
      methods: ["GET", "POST", "OPTIONS"],
      credentials: true,
    });

    const session = await getServerSession(req, res, authOptions);
    return { req, res, session };
  },
});

export default handler;
