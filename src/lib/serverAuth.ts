import { authOptions } from '~/lib/auth';
import { getServerSession } from 'next-auth';

import prismadb from '~/lib/prismadb';

const serverAuth = async () => {
  const session = await getServerSession(authOptions);
  console.log('serverAuth session: ===>', session);

  if(!session?.user?.email){
    throw new Error('Not signed in')
  }

  const currentUser = await prismadb.user.findUnique({
    where: {
      email: session.user.email,
    }
  })

  if(!currentUser){
    throw new Error('Not signed in')
  }

  return { currentUser }
}

export default serverAuth