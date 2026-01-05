"use client"

import { useState } from "react"
import { SignInForm } from "./SignInForm"
import ResetPasswordForm from "./ResetPasswordForm"
import SignUpForm from "./SignUpForm"

export function AuthContainer() {
  const [mode, setMode] = useState<"login" | "forgot" | "signin">("login")

  return (
    <div className="max-w-sm mx-auto">
      {mode === "login" && (
        <SignInForm 
            onForgot={() => setMode("forgot")}
            onSignIn={()=>setMode("signin")}
        />
      )}

       { mode === "signin" && (
          <SignUpForm
            onLogin={()=>setMode("login")}
          />
        )}
        
        {mode === "forgot" &&(
        <ResetPasswordForm onBack={() => setMode("login")} />
      )}
      
    </div>
  )
}
