import type { PrismaClient } from '@prisma/client';
// import type { MongoClient } from 'mongodb';

declare global {
  namespace globalThis {
    var prismadb: PrismaClient
  }
}

declare interface WatchProps {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  genre: string;
  duration: string;
}

declare interface UserProps {
  id: string;
  name: string;
  image: string | null;
  email: string | null;
  emailVerified: Date | null;
  hashedPassword: string | null;
  createdAt: Date;
  updatedAt: Date;
  favoriteIds: string[];
}