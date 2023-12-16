
import { PrismaClient } from '@prisma/client';

let client: PrismaClient;
const datasourceUrl = process.env.DATABASE_URL;

if (process.env.NODE_ENV === 'production') {
  client = new PrismaClient();
} else {
  if (!global.prismadb) {
    // global.prismadb = new PrismaClient()
    
    console.log('datasourceUrl：', datasourceUrl);
    global.prismadb = new PrismaClient({
      datasourceUrl,
    });
  }
  client = global.prismadb;
}

export default client;
