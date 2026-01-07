"use client"

import { authClient } from "@/lib/auth-client"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../ui/popover"
import { Avatar, AvatarFallback } from "../ui/avatar"
import { LogOut } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const AuthButton = () => {
  const [session, setSession] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    authClient.getSession().then((res) => {
      setSession(res.data ?? null)
      setLoading(false)
    })
  }, [])

  const handleSignout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          setSession(null)
          router.push("/")
        },
      },
    })
  }

  if (loading || !session) return null

  const userName = session.user?.name ?? "U"

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Avatar className="cursor-pointer w-10 h-10">
          <AvatarFallback>
            {userName.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </PopoverTrigger>

      <PopoverContent className="w-44">
        <div className="flex flex-col gap-2 text-sm">
          <button className="text-left hover:bg-neutral-200 p-2 rounded">
            Profile
          </button>

          <button className="text-left hover:bg-neutral-200 p-2 rounded">
            Settings
          </button>

          <button
            onClick={handleSignout}
            className="flex items-center gap-2 hover:bg-red-100 text-red-600 p-2 rounded"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default AuthButton
