"use client";
import React from "react";
import { FaUser } from "react-icons/fa";
import { ExitIcon } from "@radix-ui/react-icons";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { useCurrentuser } from "@/hooks/useCurrentuser";
import { LogOutButton } from "./log-out-button";
export const UserButton = () => {
  const user = useCurrentuser();
  console.log(user?.image);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage
            className="w-[40px] h-[40px] rounded-full"
            src={user?.image || ""}
          />
          <AvatarFallback>
            <FaUser />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="end">
        <LogOutButton>
          <DropdownMenuItem>
            <ExitIcon className="h-4 w-4 mr-2 " />
            Logout
          </DropdownMenuItem>
        </LogOutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
