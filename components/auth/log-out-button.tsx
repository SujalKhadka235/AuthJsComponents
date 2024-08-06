import { LogOut } from "@/actions/logout";
import React from "react";
interface LogOutButtonProps {
  children?: React.ReactNode;
}

export const LogOutButton = ({ children }: LogOutButtonProps) => {
  const onClick = () => {
    LogOut();
  };
  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  );
};
