"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useRegister from "./use-register";

export type SignupForm = {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
};

const RegisterPage = () => {
  const { handleRegister, loading } = useRegister();
  const formSchema = z
    .object({
      email: z.string().email(),
      username: z.string().min(3).max(20),
      password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters" })
        .regex(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[-!#$%&'*+/=?^_{|}~])[A-Za-z\d-!#$%&'*+/=?^_{|}~]{8,}$/,
          {
            message:
              "Password must contain at least 1 uppercase, 1 lowercase, 1 number, and 1 special character",
          }
        ),
      confirmPassword: z.string(),
    })
    .superRefine(({ password, confirmPassword }, ctx) => {
      if (password !== confirmPassword) {
        ctx.addIssue({
          code: "custom",
          message: "Passwords must match",
          path: ["confirmPassword"],
        });
      }
    });
  const form = useForm<SignupForm>({
    defaultValues: {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(formSchema),
  });
  const router = useRouter();
  const onSubmit = async (data: SignupForm) => {
    console.log("form submitted: ", data);
    await handleRegister(data);
  };

  return (
    <>
      <CardContent className="flex flex-col gap-10 text-sm font-light">
        <div className="header flex items-center flex-col gap-2">
          <h1 className="text-3xl">Create an account</h1>
          <div className="sub flex gap-1 text-center items-center">
            <span className="text-sm text-muted-foreground">
              Already have an account?
            </span>
            <span>
              <Link
                href={"/login"}
                className="text-sm text-white hover:text-primary"
              >
                Log in
              </Link>
            </span>
          </div>
        </div>
        <Form {...form}>
          <form
            className="space-y-4 w-full"
            onSubmit={form.handleSubmit(onSubmit)}
            autoComplete="off"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your email"
                      type="email"
                      className="bg-transparent placeholder:text-white"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your username"
                      type="text"
                      className="bg-transparent placeholder:text-white"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your password"
                      type="password"
                      className="bg-transparent placeholder:text-white"
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
                      placeholder="Confirm your password"
                      type="password"
                      className="bg-transparent placeholder:text-white"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full mt-10 bg-[#D40C4E]">
              {loading ? "signing up" : "Sign up"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </>
  );
};

export default RegisterPage;
