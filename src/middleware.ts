import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export default function middleware(request: NextRequest) {
  // let header = new Headers(request.headers)
  const cookies = request.cookies
  console.log('cookies:++ ', cookies);
  let sessionTokenCookie = request.cookies.get('next-auth.session-token')
  let sessionToken = sessionTokenCookie?.value;
  console.log('sessionToken: ===>', sessionToken);

  // const res = NextResponse.next();
  if(!sessionToken){
    return NextResponse.redirect(new URL('/auth', request.url))
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/profiles']
}



// import { withAuth } from "next-auth/middleware"
// import { cookies } from 'next/headers'

// // middleware is applied to all routes, use conditionals to select

// export default withAuth(
//   function middleware (req) {
//     console.log('middleware req.nextauth.token-->',req.nextauth.token)
//   },
//   {
//     callbacks: {
//       authorized: async ({ req, token }) => {
//         // Get sessionToken object
//         const cookieStore = await cookies()
//         let sessionTokenCookie = cookieStore.get('next-auth.session-token')
//         let sessionToken = sessionTokenCookie?.value;
//         console.log('sessionToken: ===>', sessionToken);

//         if (
//           !req.nextUrl.pathname.startsWith('/auth') && !sessionToken
//         ) {
//           return false
//         }
//         return true
//       }
//     }
//   }
// )