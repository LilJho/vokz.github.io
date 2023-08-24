"use client";

import {
  Form,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/FormControls/form";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/lib/validations/login";
import { TextField } from "@/components/ui/FormControls/TextField";
import { Button } from "@/components/ui/button";
import { PasswordField } from "@/components/ui/FormControls/PasswordField";
import { RiLoader5Line } from "react-icons/ri";
import { catchError } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
import { authService } from "@/services/authService";
import Link from "next/link";

interface LoginFormProps {
  setLoginSuccess: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginForm = ({ setLoginSuccess }: LoginFormProps) => {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [loading, setLoading] = useState(false);
  const { push } = useRouter();

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    setLoading(true);
    try {
      await authService({
        email: values.email,
        password: values.password,
      });
      setLoginSuccess(true);
      push("/");
      toast({
        title: "Login Success",
        description: "You have successfully logged in!",
        variant: "success",
      });
    } catch (error) {
      form.setError("email", {
        type: "manual",
        message: "Incorrect email. Please try again!",
      });
      form.setError("password", {
        type: "manual",
        message: "Incorrect password. Please try again!",
      });
      catchError(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form
        className="flex flex-col w-full max-w-sm gap-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormItem className="space-y-1">
          <FormLabel className="-mb-2">Email Address</FormLabel>
          <FormControl>
            <TextField
              placeholder="e.g. Gaia@gmail.com"
              {...form.register("email", { required: true })}
            />
          </FormControl>
          <FormMessage className="mb-1">
            {form.formState.errors.email?.message}
          </FormMessage>
        </FormItem>
        <FormItem className="space-y-1">
          <FormLabel>Password</FormLabel>
          <FormControl>
            <PasswordField
              placeholder="e.g. password"
              {...form.register("password", { required: true })}
            />
          </FormControl>
          <FormMessage className="mb-1">
            {form.formState.errors.password?.message}
          </FormMessage>
        </FormItem>
        <Link href="/forgotpassword" className="text-sm -mt-2 ml-auto font-semibold text-primary-600">
          Forgot Password?
        </Link>
        <Button className="w-full mt-6" type={loading ? "button" : "submit"}>
          {loading ? (
            <div className="flex items-center justify-center flex-1 my-auto font-semibold text-center text-white">
              <RiLoader5Line className="w-6 h-6 animate-spin" />
            </div>
          ) : (
            "Sign in"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
