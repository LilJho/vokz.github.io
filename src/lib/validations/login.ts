import * as z from "zod";

export const loginSchema = z.object({
  email: z.string().nonempty({ message: "Please enter your email address" }),
  password: z.string().nonempty({ message: "Please enter your password" }),
});
