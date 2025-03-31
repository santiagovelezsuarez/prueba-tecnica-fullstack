import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { makeExecutableSchema } from "@graphql-tools/schema";
import resolvers from "@/graphql/resolvers";
import typeDefs from "@/graphql/schema";
import { authOptions } from "./auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import { NextApiRequest, NextApiResponse } from "next";
import nextCors from "nextjs-cors";

export const schema = makeExecutableSchema({ typeDefs, resolvers });

const server = new ApolloServer({ schema });

// Crea el handler de Apollo sin aplicar CORS todavía
const apolloHandler = startServerAndCreateNextHandler(server, {
  context: async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getServerSession(req, res, authOptions);
    return { req, res, session };
  },
});

// Crea un handler envolvente que aplique CORS antes de llamar a Apollo
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Aplica CORS primero
  await nextCors(req, res, {
    origin: "*",  // En producción, es mejor especificar dominios concretos en vez de "*"
    methods: ["GET", "POST", "OPTIONS"],
    credentials: true,
  });
  
  // Después llama al handler de Apollo
  return apolloHandler(req, res);
}