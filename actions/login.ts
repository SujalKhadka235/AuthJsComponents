"use server";
import { LoginSchema } from "@/schemas";
import * as z from "zod";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { generateVerficationToken } from "@/lib/tokens";
import { getUserbyEmail } from "@/data/user";
import { sendVerificationEmail } from "@/lib/mail";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const ValidatedFeilds = LoginSchema.safeParse(values);
  if (!ValidatedFeilds.success) {
    return { error: "Invalid fields" };
  }
  const { email, password } = ValidatedFeilds.data;
  const existingUser = await getUserbyEmail(email);
  console.log(existingUser);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Email does not exist" };
  }
  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerficationToken(
      existingUser.email
    );
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );
    return { sucess: "Confirmation Email Sent!" };
  }
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
