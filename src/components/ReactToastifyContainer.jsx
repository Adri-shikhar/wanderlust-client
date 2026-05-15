"use client";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ReactToastifyContainer() {
  return <ToastContainer position="top-center" closeOnClick rtl={false} />;
}
