"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  FormDescription,
  FormLabel,
} from "@/components/ui/form"

import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Spinner } from "../ui/spinner"
import { authClient } from "@/lib/auth-client"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

const SignInFormSchema = z.object({
  email: z.email("Please enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
})

type SignInFormType = z.infer<typeof SignInFormSchema>

interface SignInFormProps {
  onForgot?: () => void
  onSignIn?: () => void
}

export function SignInForm({ onForgot, onSignIn }: SignInFormProps) {
  const form = useForm<SignInFormType>({
    resolver: zodResolver(SignInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const router =useRouter()

  const {formState} = form

  const onSubmit = async(data: SignInFormType) => {

    await authClient.signIn.email({...data},
      {
        onError: (error)=>{
          console.log(error.error.message);
          toast.error(error.error.message || "Something went wrong tray again later")
        },

        onSuccess: ()=>{
          router.push("/")
          toast.success("Login successfully")
        }
      }
    )

  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6 max-w-sm mx-auto"
      >
        <div className="text-center">
          <h1 className="text-2xl font-bold">Login to your account</h1>
          <p className="text-sm text-muted-foreground">
            Enter your email & password to continue
          </p>
        </div>

        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input 
                  type="email" 
                  placeholder="m@example.com"
                  {...field} 
                  disabled={formState.isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Password */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input 
                  type="password" 
                  placeholder="********" 
                  {...field} 
                  disabled={formState.isSubmitting}
                />
              </FormControl>
              <FormMessage />

              <a
                onClick={onForgot}
                className="text-sm text-right mt-2 underline cursor-pointer w-fit"
              >
                Forgot password?
              </a>
            </FormItem>
          )}
        />

        <Button 
          type="submit" 
          className="w-full cursor-pointer"
          disabled={formState.isSubmitting}
        >

          Login
          {formState.isSubmitting && <Spinner/>}
          
        </Button>

        <FormDescription className="text-center">
          Don&apos;t have an account?{" "}
          <button
            type="button"
            onClick={onSignIn}
            className="underline underline-offset-4 cursor-pointer"
          >
            Sign up
          </button>
        </FormDescription>
      </form>
    </Form>
  )
}
