"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import React from "react"
import {useForm } from "react-hook-form"
import z from "zod"
import { FormControl, FormField, FormItem, FormLabel, Form } from "../ui/form"
import { Input } from "../ui/input"
import { Button } from "../ui/button"

const ResetPasswordSchema = z.object({
  email:z.email("Please enter a valid email"),
})

type ResetPasswordType = z.infer<typeof ResetPasswordSchema>

const ResetPasswordForm = ({onBack}: {onBack?: ()=>void}) => {

  const form = useForm<ResetPasswordType>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues:{
      email:"",
    }
  })

  const {formState} = form

  const onSubmit = (data:ResetPasswordType)=>{
    console.log("Form Data:", data)
  }

  return (
    <Form {...form}>
      <form 
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex flex-col gap-6 max-w-sm mx-auto'
      >
        <div className="text-center">
          <h1 className='text-2xl font-bold'>Reset your password</h1>
          <p className='text-sm text-muted-foreground'>Enter your email to receive reset instructions</p>
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field })=>(
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type='email'
                  placeholder="Enter your email"
                  {...field}
                  disabled={formState.isSubmitting}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button 
          type="submit" 
          className="w-full" 
          disabled={formState.isSubmitting}
        >
          Send Reset Link
        </Button>

        <button
          type="button"
          onClick={onBack}
          className="text-sm text-center underline"
        >
          Back to login
        </button>
      </form>
    </Form>
  )
}

export default ResetPasswordForm