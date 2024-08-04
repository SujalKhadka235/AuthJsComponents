import { db } from "@/lib/db";
export const getVerificationTokenByEmail = async (email: string) => {
  try {
    const VerificationToken = db.verificationToken.findFirst({
      where: {
        email,
      },
    });
    return VerificationToken;
  } catch (e) {
    return null;
  }
};
export const getVerificationTokenByToken = async (token: string) => {
  try {
    const VerificationToken = db.verificationToken.findUnique({
      where: {
        token,
      },
    });
    return VerificationToken;
  } catch (e) {
    return null;
  }
};
