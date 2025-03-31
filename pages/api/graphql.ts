import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { makeExecutableSchema } from "@graphql-tools/schema";
import resolvers from "@/graphql/resolvers";
import typeDefs from "@/graphql/schema";
import { authOptions } from "./auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import { NextApiRequest, NextApiResponse } from "next";
import Cors from 'cors';

export const schema = makeExecutableSchema({ typeDefs, resolvers });

// Inicializa el middleware CORS
const cors = Cors({
  origin: '*', // O especifica los dominios permitidos: ['https://tufrontend.com']
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'apollo-require-preflight'],
  credentials: true,
});

// Helper para ejecutar middleware
function runMiddleware(req: NextApiRequest, res: NextApiResponse, fn: Function) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

const server = new ApolloServer({ 
  schema,
  // Asegúrate de que Apollo Server acepte solicitudes con preflight
  csrfPrevention: false,
});

// Crea el handler de Apollo
const apolloHandler = startServerAndCreateNextHandler(server, {
  context: async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getServerSession(req, res, authOptions);
    return { req, res, session };
  },
});

// Handler principal que aplica CORS
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // 1. Configuramos manualmente algunos headers CORS críticos
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*'); // O tu dominio específico
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, apollo-require-preflight');
  
  // 2. Para solicitudes OPTIONS (preflight), respondemos inmediatamente
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  // 3. Para otras solicitudes, aplicamos el middleware CORS
  await runMiddleware(req, res, cors);
  
  // 4. Después llamamos al handler de Apollo
  return apolloHandler(req, res);
}