"use client"

import {
    Form, FormControl,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/FormControls/form'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from '@/lib/validations/login';
import { TextField } from '@/components/ui/FormControls/TextField';
import { Button } from '@/components/ui/button';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { PasswordField } from '@/components/ui/FormControls/PasswordField';
import { RiLoader5Line } from 'react-icons/ri';
import { catchError } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { toast } from '@/components/ui/use-toast';

const LoginForm = () => {
    const supabase = createClientComponentClient()

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    const [loading, setLoading] = useState(false)
    const { push, refresh } = useRouter()

    async function onSubmit(values: z.infer<typeof loginSchema>) {
        setLoading(true);
        try {
            const { error } = await supabase.auth.signInWithPassword({
                email: values.email,
                password: values.password,
            });
            if (error) {
                form.setError("email", {
                    type: "manual",
                    message: "Incorrect email. Please try again!",
                });
                form.setError("password", {
                    type: "manual",
                    message: "Incorrect password. Please try again!",
                });
            } else {
                push("/");
                refresh()
                toast({
                    title: "Login Success",
                    description: "You have successfully logged in!",
                    variant: "success",
                })
            }
        } catch (error) {
            catchError(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <Form {...form}>
            <form className='w-full max-w-sm flex flex-col gap-4' onSubmit={form.handleSubmit(onSubmit)}>
                <FormItem className='space-y-1'>
                    <FormLabel className='-mb-2'>Email Address</FormLabel>
                    <FormControl>
                        <TextField
                            placeholder="e.g. Gaia@gmail.com"
                            {...form.register("email", { required: true })}
                        />
                    </FormControl>
                    <FormMessage className='mb-1'>
                        {form.formState.errors.email?.message}
                    </FormMessage>
                </FormItem>
                <FormItem className='space-y-1'>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                        <PasswordField
                            placeholder="e.g. password"
                            {...form.register("password", { required: true })}
                        />
                    </FormControl>
                    <FormMessage className='mb-1'>
                        {form.formState.errors.password?.message}
                    </FormMessage>
                </FormItem>
                <Button className='w-full mt-6' type={loading ? "button" : "submit"}>
                    {loading ?
                        <div className="flex-1 my-auto font-semibold text-center text-white flex items-center justify-center">
                            <RiLoader5Line className="animate-spin w-6 h-6" />
                        </div> :
                        "Sign in"
                    }
                </Button>
            </form>
        </Form>
    )
}

export default LoginForm