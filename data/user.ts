import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const getUserbyEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  } catch (e: any) {
    NextResponse.json({ msg: "Error in getUserbyEmail", status: 500 });
  }
};
export const getUserbyId = async (id: string) => {
  try {
    const user = await db.user.findUnique({ where: { id } });
    return user;
  } catch (e: any) {
    NextResponse.json({ msg: "Error in getUserbyId", status: 500 });
  }
};
