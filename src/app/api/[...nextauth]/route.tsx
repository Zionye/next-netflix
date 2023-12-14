import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { compare } from 'bcrypt';

import prismadb from '~/lib/prismadb';

// NextAuth 配置，实现用户身份验证和授权。
export default NextAuth({
  providers: [
    Credentials({
      id: 'credentials',
      name: 'Credentials',
      credentials: {  // 用于身份验证。
        email: {
          label: "Email",
          type: 'text',
        },
        password: {
          label: "Password",
          type: 'password',
        }
      },
      async authorize(credentials, req) { // 用于授权用户
        // 检查 credentials 对象中是否包含 email 和 password 
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
    signIn: '/auth',
  },
  debug: process.env.NODE_ENV === "development", // 开发环境中启用调试模式
  session: { // 配置会话存储策略，在本例中使用 JWT 作为会话存储策略。
    strategy: 'jwt',
  },
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET
  },
  secret: process.env.NEXTAUTH_SECRET
})