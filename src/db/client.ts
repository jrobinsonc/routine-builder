/**
 * See <https://www.prisma.io/docs/orm/more/help-and-troubleshooting/help-articles/nextjs-prisma-client-dev-practices#solution>
 */
import { isProd } from '@/constants';
import { PrismaClient } from '@prisma/client';

const prismaClientSingleton = (): PrismaClient => {
  return new PrismaClient();
};

declare global {
  // eslint-disable-next-line vars-on-top, no-var
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma: PrismaClient = globalThis.prisma ?? prismaClientSingleton();

export default prisma;

if (!isProd) globalThis.prisma = prisma;
