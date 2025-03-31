import { PrismaClient } from '@prisma/client';
import { hasRole } from '@/graphql/helpers';

const prisma = new PrismaClient();

const transactionsResolver = {
    Query: {
        transactions: async (_: any, { startDate, endDate }: any, contextValue: any) => {                           
            const whereClause: Record<string, any> = {};

            const filters: Record<string, Date> = {};

            if (startDate) {
                const start = new Date(startDate);
                if (!isNaN(start.getTime())) 
                    filters.gte = start;                
            }

            if (endDate) {
                const end = new Date(endDate);
                if (!isNaN(end.getTime()))
                    filters.lte = end;                
            }

            if (Object.keys(filters).length > 0)
                whereClause.date = filters;
            

            const transactions = await prisma.transaction.findMany({
                where: Object.keys(whereClause).length ? whereClause : undefined,
                include: { user: true },
                orderBy: { date: 'desc' },
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

