"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/FormControls/form";
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
import { RiLoader5Line } from "react-icons/ri";
import { createResetPasswordToken } from "@/services/authService";
import { toast } from "@/components/ui/use-toast";

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
});

const ForgotPassForm = () => {
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const { push } = useRouter();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    try {
      await createResetPasswordToken(values.email);
      toast({
        title: "Send Link Success",
        description: "You have successfully send reset link!",
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
            Forgot your Password?
          </h2>
          <span className="text-gray-500">
            No worries! just enter your email to reset it.
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      className="focus:border-primary-500"
                      placeholder="johndoe@gmail.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              className="w-full mt-12"
              type={loading ? "button" : "submit"}
            >
              {loading ? (
                <div className="flex items-center justify-center flex-1 my-auto font-semibold text-center text-white">
                  <RiLoader5Line className="w-6 h-6 animate-spin" />
                </div>
              ) : (
                "Submit Request"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ForgotPassForm;
