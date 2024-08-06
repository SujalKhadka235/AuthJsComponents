"use client";

import React from "react";
import { useSession, signOut } from "next-auth/react";
import { LogOut } from "@/actions/logout";
import { useCurrentuser } from "@/hooks/useCurrentuser";

const SettingsPage = () => {
  const user = useCurrentuser();
  const onClick = () => {
    LogOut();
  };
  return (
    <div className="bg-white p-10 rounded-xl">
      <button onClick={onClick} type="submit">
        Sign out
      </button>
    </div>
  );
};

export default SettingsPage;
