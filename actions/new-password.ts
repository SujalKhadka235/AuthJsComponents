"use server";
import * as z from "zod";
import { NewPasswordSchema } from "@/schemas";
import { getVerificationTokenByToken } from "@/data/verification-token";
import { db } from "@/lib/db";
import { getUserbyEmail } from "@/data/user";
import email from "next-auth/providers/email";
import bcrypt from "bcryptjs";
import { getPasswordResetTokenByToken } from "@/data/passwordreset-token";

export const NewPassword = async (
  values: z.infer<typeof NewPasswordSchema>,
  token?: string | null
) => {
  if (!token) {
    return { error: "Missing token" };
  }
  const validatedFields = NewPasswordSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid Field" };
  }
  const { password } = validatedFields.data;
  const existingToken = await getPasswordResetTokenByToken(token);
  if (!existingToken) {
    return { error: "Invalid Token" };
  }
  const hasExpired = new Date(existingToken.expires) < new Date();
  if (hasExpired) {
    return { error: "Token has expired" };
  }
  const existingUser = await getUserbyEmail(existingToken.email);
  if (!existingUser) {
    return { error: "User does not exist" };
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  await db.user.update({
    where: { id: existingUser.id },
    data: { password: hashedPassword },
  });
  await db.passwordResetToken.delete({
    where: { id: existingToken.id },
  });
  return { sucess: "Password Updated" };
};
