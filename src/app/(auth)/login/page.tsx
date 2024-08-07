"use client";

import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { z } from "zod";
import useLogin from "./use-login";

type Props = {};

const formSchema = z.object({
  email: z.string().email(),
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
});

export type LoginForm = z.infer<typeof formSchema>;

/**
 * Renders the login page.
 *
 * @param props - The component props.
 * @returns The rendered login page.
 */
const LoginPage = (props: Props): JSX.Element => {
  const { loading, handleLogin } = useLogin();
  const form = useForm<LoginForm>({
    resolver: zodResolver(formSchema),
  });
  const router = useRouter();

  const onSubmit = async (data: LoginForm) => {
    await handleLogin(data);
  };

  return (
    <>
      <CardContent className="flex flex-col gap-10 text-sm font-light">
        <div className="header flex items-center flex-col gap-2">
          <h1 className="text-3xl">Welcome</h1>
          <div className="sub flex gap-1 text-center items-center">
            <span className="text-sm text-muted-foreground">New here?</span>
            <span>
              <Link
                href={"/register"}
                className="text-sm text-white hover:text-primary"
              >
                Create account
              </Link>
            </span>
          </div>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 w-full"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your registered email"
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
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      {...field}
                      className="bg-transparent placeholder:text-white"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="forgot-password flex justify-end">
              <Link
                href={"/forgot-password"}
                className="text-xs hover:text-primary"
              >
                Forgot password?
              </Link>
            </div>
            <Button type="submit" className="w-full mt-10 bg-[#D40C4E]"  disabled={!form.formState.isDirty || !form.formState.isValid || form.formState.isSubmitting}>
              Log in
            </Button>
          </form>
        </Form>
      </CardContent>
    </>
  );
};

export default LoginPage;
