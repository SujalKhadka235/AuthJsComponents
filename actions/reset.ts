"use server";
import { ResetSchema } from "@/schemas";
import { db } from "@/lib/db";
import * as z from "zod";
import { getUserbyEmail } from "@/data/user";
import { generatePasswordResetToken } from "@/lib/tokens";
import { sendPasswordResetEmail } from "@/lib/mail";
export const reset = async (values: z.infer<typeof ResetSchema>) => {
  const validatedFeilds = ResetSchema.safeParse(values);
  if (!validatedFeilds.success) {
    return {
      error: "Invalid Email",
    };
  }
  const { email } = validatedFeilds.data;
  const existingUser = await getUserbyEmail(email);
  if (!existingUser) {
    return { error: "Email not found" };
  }
  const passwordResetToken = await generatePasswordResetToken(email);
  await sendPasswordResetEmail(
    passwordResetToken.email,
    passwordResetToken.token
  );

  return { sucess: "Reset email sent!" };
};
