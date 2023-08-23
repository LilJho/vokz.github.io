"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LoginIllu from "@public/logo/green_logo.png";
import Image from "next/image";
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { RiLoader5Line } from "react-icons/ri";
import { updatePassword } from "@/services/authService";

const formSchema = z.object({
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
  confirmPassword: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

const UpdatePassword = () => {
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const { push } = useRouter();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    try {
      await updatePassword(values.password);
      push("/");
      toast({
        title: "Update Success",
        description: "You have successfully updated your password!",
        variant: "success",
      });
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Card className="border-0 border-none">
      <CardHeader className="flex flex-col items-center justify-center gap-6">
        <Image src={LoginIllu} alt="Login Illustration" className="w-52" />
        <div className="my-6 text-center">
          <h2 className="text-2xl font-bold tracking-widest">
            Update your password Here
          </h2>
          <span className="text-gray-500">
            Please don't forget your passwod again.
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      className="focus:border-primary-500"
                      type="password"
                      placeholder="******"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      className="focus:border-primary-500"
                      type="password"
                      placeholder="******"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              className="w-full mt-6"
              type={loading ? "button" : "submit"}
            >
              {loading ? (
                <div className="flex items-center justify-center flex-1 my-auto font-semibold text-center text-white">
                  <RiLoader5Line className="w-6 h-6 animate-spin" />
                </div>
              ) : (
                "Update Password"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default UpdatePassword;
