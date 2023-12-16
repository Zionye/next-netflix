"use client"
import { signOut } from "next-auth/react"
import { useRouter } from "next/navigation";


const Profiles = () => {
  const router = useRouter()
  return (
    <div>
      profiles page

      <button onClick={()=> 
        signOut({ redirect: false }).then(() => {
          router.push("/auth"); // Redirect to the home page after signing out
        })
      } className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition" >
        LogOut
      </button>
    </div>
  )
}

export default Profiles