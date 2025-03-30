import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const transactionsResolver = {
    Query: {
        transactions: async () => {
            const transactions = await prisma.transaction.findMany({   
                include: {
                    user: true,
                },
                orderBy: {
                    date: 'desc',
                },         
            });
            return transactions.map((transaction) => ({
                ...transaction,
                date: transaction.date.toISOString().split('T')[0],
            }));
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

