"use server";
import * as z from "zod";
import { SettingsSchema } from "@/schemas";
import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";
import { getUserbyEmail, getUserbyId } from "@/data/user";
import email from "next-auth/providers/email";
import { generateVerficationToken } from "@/lib/tokens";
import { send } from "process";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/lib/mail";
import { error } from "console";
export const Settings = async (values: z.infer<typeof SettingsSchema>) => {
  const user = await currentUser();
  if (!user) {
    return { error: "Unauthorized" };
  }
  const dbUser = await getUserbyId(user.id);

  if (!dbUser) {
    return { error: "Unauthorized" };
  }
  if (user.isOauth) {
    values.email = undefined;
    values.password = undefined;
    values.newPassword = undefined;
    values.isTwoFactorEnabled = undefined;
  }
  if (values.email && values.email !== user.email) {
    const existingUser = await getUserbyEmail(values.email);
    if (existingUser && existingUser.id != user.id) {
      return { error: "Email already in use" };
    }
    const verficationtoken = await generateVerficationToken(values.email);
    await sendVerificationEmail(verficationtoken.email, verficationtoken.token);
    return { success: "Verification email sent" };
  }
  if (values.password && values.newPassword && dbUser.password) {
    const passwordsMatch = await bcrypt.compare(
      values.password,
      dbUser.password
    );
    if (!passwordsMatch) {
      return { error: "Incorrect Password" };
    }
    const hashedPassword = await bcrypt.hash(values.newPassword, 10);
    values.password = hashedPassword;
    values.newPassword = undefined;
  }
  await db.user.update({
    where: {
      id: dbUser.id,
    },
    data: {
      ...values,
    },
  });
  return { success: "Settings updated" };
};
