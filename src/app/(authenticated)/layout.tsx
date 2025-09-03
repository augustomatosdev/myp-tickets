import { redirect } from "next/navigation";
import React from "react";

const Layout = () => {
  const isAuthenticated = false; // 🔹 depois pode vir do contexto/auth
  if (!isAuthenticated) {
    redirect("/login");
  }
  return <div>Layout</div>;
};

export default Layout;
