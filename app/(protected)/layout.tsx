interface ProtectedlayoutProps {
  children: React.ReactNode;
}
import React from "react";
import Navbar from "./_components/Navbar";

const Protectedlayout = ({ children }: ProtectedlayoutProps) => {
  return (
    <div className="h-full w-full flex flex-col gap-y-10 items-center justify-center bg-gradient-to-r from-sky-400 to-blue-800">
      <Navbar />
      {children}
    </div>
  );
};

export default Protectedlayout;
