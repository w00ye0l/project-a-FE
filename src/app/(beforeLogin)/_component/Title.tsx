"use client";

import { usePathname } from "next/navigation";
import style from "../auth/layout.module.css";

export default function Title() {
  const pathname = usePathname();

  return (
    <h1 className={style.title}>
      {pathname === "/auth/signup" ? "회원가입" : "로그인"}
    </h1>
  );
}
