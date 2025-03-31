import { PrismaClient } from '@prisma/client';
import { hasRole } from '@/graphql/helpers';

const prisma = new PrismaClient();

const userResolvers = {
  Query: {
    users: hasRole(["ADMIN"], async (_: any) => {      
      const users = await prisma.user.findMany({
        orderBy: { createdAt: 'desc' },
      });
      return users.map((user: any) => ({
        ...user,
        createdAt: user.createdAt.toISOString().split('T')[0],
      }));
    }),
    user: hasRole(["ADMIN"], async (_: any, { id }: { id: string }) => {
      const user = await prisma.user.findUnique({
        where: { id },
      });
      if (!user) {
        throw new Error('Usuario no encontrado');
      }
      return user;
    }),
  },
  Mutation: {
    updateUser: hasRole(["ADMIN"], async (_: any, { id, name, role }: any, context: any) => {      
      const updatedUser = await prisma.user.update({
        where: { id },
        data: {
          name,
          role,
        },
      });      
      return updatedUser;
    }),
  }
}

export default userResolvers;