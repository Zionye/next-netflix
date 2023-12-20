"use client"
import { signOut, useSession } from "next-auth/react"
import { useRouter } from "next/navigation";
import React from "react"


interface AccountMenuProps {
  visible?: boolean;
}
const AccountMenu: React.FC<AccountMenuProps> = ({
  visible
}) => {
  const router = useRouter()
  const {data: session, status} = useSession();

  if(!visible){
    return null;
  }

  return (
    <div className="bg-black w-56 absolute top-14 right-0 py-5 flex-col border-2 border-gray-800 flex">
      <div className="flex flex-col gap-3">
        <div className="px-3 group/item flex flex-row gap-3 items-center w-full">
          <img className="w-8 rounded-md" src={status === 'authenticated' && session.user?.image || "/images/default-blue.png" } alt="" />
          <p className="text-white text-sm group-hover/item:underline">
            {status === 'authenticated' && session.user?.name}
          </p>
        </div>
        <hr className="bg-gray-600 border-0 h-px my-4"/>
        <div onClick={()=> {
          signOut({ redirect: false }).then(() => {
            router.push("/auth"); // Redirect to the home page after signing out
          })
        }} className="px-3 text-center text-white text-sm hover:underline">
          Sign out of netflix
        </div>
      </div>
    </div>
  )
}

export default AccountMenu