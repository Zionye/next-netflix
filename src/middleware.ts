import { withAuth } from "next-auth/middleware"
import { cookies } from 'next/headers'

// middleware is applied to all routes, use conditionals to select

export default withAuth(
  function middleware (req) {
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        // Get sessionToken object
        const cookieStore = cookies()
        let sessionTokenCookie = cookieStore.get('next-auth.session-token')
        let sessionToken = sessionTokenCookie?.value;
        console.log('sessionToken: ===>', sessionToken);

        if (
          !req.nextUrl.pathname.startsWith('/auth') && !sessionToken
        ) {
          return false
        }
        return true
      }
    }
  }
)