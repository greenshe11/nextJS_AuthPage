"use client";

import { signOut, useSession } from "next-auth/react"

export default function UserInfo(){
    const {data: session} = useSession();
    return (
    <div>
       <h1>Welcome</h1>
       <h6>{session?.user?.email}</h6>
       <button className="bg-red-500" onClick={() => signOut()}>Log Out</button>
    </div>)
}