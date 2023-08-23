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
import { useRouter, useSearchParams } from "next/navigation";
import { RiLoader5Line } from "react-icons/ri";
import { useState } from "react";
import { registerService } from "@/services/authService";
import { UserAccountsService } from "@/services/databaseServices";
import { toast } from "@/components/ui/use-toast";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
  confirmPassword: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

const Register = () => {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);

  const firstName = searchParams.get("firstName");
  const middleName = searchParams.get("middleName");
  const lastName = searchParams.get("lastName");
  const email = searchParams.get("email");

  const personalFNameString = Array.isArray(firstName)
    ? firstName[0]
    : firstName || ""; // default to an empty string if undefined
  const personalMNameString = Array.isArray(middleName)
    ? middleName[0]
    : middleName || ""; // default to an empty string if undefined
  const personalLNameString = Array.isArray(lastName)
    ? lastName[0]
    : lastName || ""; // default to an empty string if undefined

  const personalEmailString = Array.isArray(email) ? email[0] : email || ""; // default to an empty string if undefined

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name:
        personalFNameString +
        " " +
        personalMNameString +
        " " +
        personalLNameString,
      email: personalEmailString,
      password: "",
      confirmPassword: "",
    },
  });

  const { push } = useRouter();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    if (values.password !== values.confirmPassword) {
      alert("Please match your password!");
      return;
    }
    try {
      const userID = await registerService({
        email: values.email,
        password: values.password,
      });
      await UserAccountsService.create({
        role: "patient",
        uuid: userID,
        first_name: firstName,
        middle_name: middleName,
        last_name: lastName,
      });
      push("/");
      toast({
        title: "Register Success",
        description: "You have successfully registered!",
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
          <h2 className="text-2xl font-bold tracking-widest">Almost Done!</h2>
          <span className="text-gray-500">Please set your password!</span>
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* <div className="flex items-center justify-center gap-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
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
                      <Input placeholder="johndoe@gmail.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div> */}

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
              className="w-full mt-16"
              type={loading ? "button" : "submit"}
            >
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
      </CardContent>
    </Card>
  );
};

export default Register;
