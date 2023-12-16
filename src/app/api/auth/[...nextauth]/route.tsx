import NextAuth from "next-auth";
import type { NextAuthOptions } from 'next-auth'
import Credentials from "next-auth/providers/credentials";
import { compare } from 'bcrypt';

import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

import { PrismaAdapter } from '@next-auth/prisma-adapter';

import prismadb from '~/lib/prismadb';

// NextAuth 配置，实现用户身份验证和授权。
export const authOptions: NextAuthOptions = { // NextAuth 的入口，用于配置身份验证
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID || '',
      clientSecret: process.env.GITHUB_SECRET || '',
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
    Credentials({ // 身份验证提供程序的名称。是一个内置的身份验证提供程序，用于使用用户名和密码进行身份验证。
      id: 'credentials', // 身份验证提供程序的唯一标识符
      name: 'Credentials', // 身份验证提供程序的名称
      credentials: {  // 包含用于身份验证的凭据类型
        email: {
          label: "Email",
          type: 'text',
        },
        password: {
          label: "Password",
          type: 'password',
        }
      },
      async authorize(credentials, req) { // 回调函数，用于处理身份验证过程。
        console.log('credentials: ==>', credentials);
        // 检查电子邮件和密码是否都已提供
        if(!credentials?.email || !credentials?.password){
          throw new Error('Email and password is required')
        }

        // 使用提供的电子邮件地址查找数据库中的用户
        const user = await prismadb.user.findUnique({
          where: {
            email: credentials.email
          }
        });

        // 找不到用户或用户没有加密的密码
        if(!user || !user.hashedPassword) {
          throw new Error('Email dose not exist')
        }

        // 使用提供的密码和数据库中存储的密码进行比较
        const isCorrectPassword = await compare(
          credentials.password, 
          user.hashedPassword
        );

        if(!isCorrectPassword){
          throw new Error('Incorrect password')
        }

        return user;
      },
    })
  ],
  pages: { // 定义应用程序中用于登录的页面
    signIn: '/auth', // 登录页面的 URL
  },
  debug: process.env.NODE_ENV === "development", // 开发环境中启用调试模式
  adapter: PrismaAdapter(prismadb), // 使用 PrismaAdapter 适配器进行身份验证
  session: { // 配置会话存储策略，在本例中使用 JWT 作为会话存储策略。
    strategy: 'jwt',
  },
  jwt: { // 配置 JWT 策略
    secret: process.env.NEXTAUTH_JWT_SECRET // JWT 密钥的配置
  },
  secret: process.env.NEXTAUTH_SECRET, // NextAuth 应用程序的密钥配置
  callbacks: {
    async jwt({ token, user, account, profile, isNewUser }) {
      // console.log('JWT ---- token, user, account, profile, isNewUser: ==>', token, user, account, profile, isNewUser);
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token, user }) {
      // console.log('session, token, user: ===>', session, token, user);
      if (session?.user && token) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
}
const handler = NextAuth(authOptions)

/**
 *  GET 方法表示在 HTTP GET 请求下执行的操作。在这里，它将渲染一个名为 auth 的页面。
    POST 方法表示在 HTTP POST 请求下执行的操作。在这里，它将使用提供的电子邮件和密码进行身份验证。如果验证成功，它将返回用户对象。如果验证失败，它将抛出一个错误。
 */
export { handler as GET, handler as POST }