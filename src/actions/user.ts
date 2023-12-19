"use server";

import prismadb from '~/lib/prismadb';
import serverAuth from '~/lib/serverAuth';

export const getSelf = async () => {
  const { currentUser } = await serverAuth();
  console.log('self: --->', currentUser);

  if (!currentUser || !currentUser.name) {
    throw new Error("Unauthorized");
  }

  const user = await prismadb.user.findUnique({
    where: { id: currentUser.id },
  });

  if (!user) {
    throw new Error("Not found");
  }

  return user;
};