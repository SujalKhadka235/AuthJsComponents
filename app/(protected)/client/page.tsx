"use client";
import { UserInfo } from "@/components/user-info";
import { useCurrentuser } from "@/hooks/useCurrentuser";
import { currentUser } from "@/lib/auth";
import React from "react";

const ClientPage = () => {
  const user = useCurrentuser();
  return <UserInfo user={user} label="⌚️ Client Component" />;
};

export default ClientPage;
