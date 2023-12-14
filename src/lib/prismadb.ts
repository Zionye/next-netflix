
import { PrismaClient } from '@prisma/client';

let client: PrismaClient;
const datasourceUrl = process.env.DATABASE_URL;

if (process.env.NODE_ENV === 'production') {
  client = new PrismaClient();
} else {
  console.log('datasourceUrl：', datasourceUrl);
  if (!global.prismadb) {
    // global.prismadb = new PrismaClient()
    
    global.prismadb = new PrismaClient({
      datasourceUrl,
    });
  }
  client = global.prismadb;
}

export default client;
