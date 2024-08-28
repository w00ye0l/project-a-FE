import React from "react";
import style from "./layout.module.css";
import Title from "../_component/Title";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (session?.user) {
    redirect("/");
  }

  return (
    <div className={style.mainSection}>
      <div className={style.logoSection}>
        {/* <div className={style.logoImg}>Logo</div> */}
        <Title />
      </div>
      {children}
    </div>
  );
}
