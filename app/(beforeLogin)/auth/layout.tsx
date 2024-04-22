import React from "react";
import style from "./layout.module.css";
import Title from "../_component/Title";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={style.mainSection}>
      <div className={style.logoSection}>
        <div className={style.logoImg}>Logo</div>
        <Title />
      </div>
      {children}
    </div>
  );
}
