"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import React from 'react'
import z from 'zod'
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useForm } from "react-hook-form"
import { Spinner } from "../ui/spinner"
import { authClient } from "@/lib/auth-client"
import { toast } from "sonner"
import { useRouter } from "next/navigation"


const SignUpFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.email("Please enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
})

interface SignUpFormProps {
    onLogin?: ()=>void

}

type SignUpFormType = z.infer<typeof SignUpFormSchema>

const SignUpForm = ({onLogin}: SignUpFormProps) => {

    const router = useRouter()

    const form = useForm<SignUpFormType>({
        resolver: zodResolver(SignUpFormSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        }
    })

    const {formState} = form

    const onSubmit = async (data:SignUpFormType)=>{
        // console.log("Form Data:", data)
        await authClient.signUp.email({...data},
            {
                onError: (error)=>{
                    console.log(error);
                    toast.error(error.error.message || "Something Went wrong")
                },
                onSuccess: () =>{
                    toast.success("You're account has been created successfully")
                    router.push("/")
                }
            }
    )}
  return (
    <Form {...form}>
        <form 
            onSubmit={form.handleSubmit(onSubmit)}
            className='flex flex-col gap-6 max-w-sm mx-auto'
        >

            <div className="text-center">
                <h1 className='text-2xl font-bold'>Create your account</h1>
                <p className='text-sm text-muted-foreground'>Join us to plan your perfect trip</p>
            </div>

            <FormField
                control={form.control}
                name="name"
                render={({ field })=>(
                    <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                            <Input
                                type='text'
                                placeholder="John Doe"
                                {...field}
                                disabled={formState.isSubmitting}
                            />
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}
            />

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

            <FormField
                control={form.control}
                name="password"
                render={({field})=>(
                    <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                            <Input
                                type='password'
                                placeholder="********"
                                {...field}
                                disabled={formState.isSubmitting}
                            />
                        </FormControl>
                    </FormItem>
                )}
            />

            <Button disabled={formState.isSubmitting} type='submit' className='w-full'>
                Login
                {formState.isSubmitting && <Spinner/>}
            </Button>

            <FormDescription className='text-center'>
                Already have an account? <a href="/sign-in" className='text-primary underline' onClick={onLogin}>Sign In</a>
            </FormDescription>

        </form>
    </Form>
  )
}

export default SignUpForm