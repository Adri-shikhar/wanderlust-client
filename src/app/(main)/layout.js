import React from "react";
import Navbar from "@/components/Navbar";
import "@/app/globals.css";

export default function MainLayout({ children }) {
  return (
    <div className="page-gradient flex min-h-screen flex-col">
      <Navbar />
      <div className="flex-1">{children}</div>
    </div>
  );
}
