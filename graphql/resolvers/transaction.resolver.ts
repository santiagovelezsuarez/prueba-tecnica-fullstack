import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const transactionsResolver = {
    Query: {
        transactions() {
            return prisma.transaction.findMany({   
                include: {
                    user: true,
                },             
            });
        },
    },
    Mutation: {
        addTransaction: async (_: any, { amount, date, description, type }: any, context: any) => {           
            const { session } = context;    
            if (!session || !session.user?.id) {                
                throw new Error('No autorizado. Debes iniciar sesión.');
            }            
            const newTransaction = await prisma.transaction.create({
                data: {                                   
                    userId: session.user.id,
                    description,
                    amount,
                    date,
                    type,
                },
            });            
            return newTransaction;
        }
    },
};

export default transactionsResolver;

