"use client"
import { GalleryVerticalEnd } from "lucide-react"
import {SignInForm} from "@/components/auth/SignInForm"
import { AuthContainer } from "@/components/auth/AuthContainer"
import { useEffect } from "react"
import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"

export default function SigninPage() {

    const router = useRouter()

    useEffect(()=>{
        authClient.getSession().then(session =>{
            if(session.data !== null) router.push("/")
        })
    },[router])

    
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <GalleryVerticalEnd className="size-4" />
            </div>
            Acme Inc.
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <AuthContainer />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <img
          src="https://images.unsplash.com/photo-1620641788421-7a1c342ea42e"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  )
}
