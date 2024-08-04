"use server";
import { RegisterSchema } from "@/schemas";
import * as z from "zod";
import bcrypt from "bcrypt";
import { db } from "@/lib/db";
import { getUserbyEmail } from "@/data/user";
import { generateVerficationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const ValidatedFeilds = RegisterSchema.safeParse(values);
  if (!ValidatedFeilds.success) {
    return { error: "Invalid fields" };
  }
  const { email, password, name } = ValidatedFeilds.data;
  const hashedPassword = await bcrypt.hash(password, 10);
  const existingUser = await getUserbyEmail(email);
  if (existingUser) {
    return { error: "Email already exists" };
  }
  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });
  const VerificationToken = await generateVerficationToken(email);
  await sendVerificationEmail(VerificationToken.email, VerificationToken.token);

  return { sucess: "Confirmation Email Sent" };
};
