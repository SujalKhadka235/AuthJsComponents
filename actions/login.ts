"use server";
import { LoginSchema } from "@/schemas";
import * as z from "zod";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { error } from "console";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const ValidatedFeilds = LoginSchema.safeParse(values);
  if (!ValidatedFeilds.success) {
    return { error: "Invalid fields" };
  }
  const { email, password } = ValidatedFeilds.data;
  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentails" };
        default:
          return { error: "Something went wrong" };
      }
    }
    throw error;
  }
};
