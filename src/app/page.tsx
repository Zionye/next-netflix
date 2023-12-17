"use client"
import { signOut } from "next-auth/react"
import { useRouter } from "next/navigation";
import { useSession } from 'next-auth/react';

export default function Home() {
  const router = useRouter()

  const { data: session, status } = useSession();
  
  return (
    <main className="text-white">
      Bilibili Clone

      <div>
      ClientComponent {status}{' '}
      {status === 'authenticated' && session.user?.name}
      </div>

      <button onClick={()=> 
        signOut({ redirect: false }).then(() => {
          router.push("/auth"); // Redirect to the home page after signing out
        })
      } className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition" >
        LogOut
      </button>

    </main>

  )
}
