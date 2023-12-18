import bcrypt from 'bcrypt'
import { NextResponse } from "next/server";
import prismadb from '~/lib/prismadb';

// Handles POST requests to /api
export async function POST(request: Request) {
  const { email, name, password } = await request.json();

  const existingUser = await prismadb.user.findUnique({
    where: {
      email,
    }
  })

  if(existingUser){
    return NextResponse.json({ error: 'Email taken' }, {status: 422});
  }

  // 将用户输入的密码进行哈希处理的。(哈希是一种加密方式，可以将原始密码转换为不可逆的字符串，从而提高密码的安全性。)
  const hashedPassword = await bcrypt.hash(password, 12)

  const user = await prismadb.user.create({
    data: {
      email,
      name,
      hashedPassword,
      image: '',
      emailVerified: new Date()
    }
  })

  return NextResponse.json({ data: user }, {status: 200});
}