import React from "react";
import Navbar from "@/components/Navbar";
import "@/app/globals.css";

export default function MainLayout({ children }) {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
}