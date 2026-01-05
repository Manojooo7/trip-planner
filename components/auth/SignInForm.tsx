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

  const onSubmit = (data: SignInFormType) => {
    console.log("Form Data:", data)
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
                <Input type="email" placeholder="m@example.com" {...field} />
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
                <Input type="password" placeholder="********" {...field} />
              </FormControl>
              <FormMessage />

              <button
                type="button"
                onClick={onForgot}
                className="text-sm text-right mt-2 underline cursor-pointer"
              >
                Forgot password?
              </button>
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Login
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
