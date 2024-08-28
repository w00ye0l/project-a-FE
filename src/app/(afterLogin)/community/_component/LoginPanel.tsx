"use client";

import Link from "next/link";
import style from "./userProfile.module.css";
import cx from "classnames";
import { useRouter } from "next/navigation";

export default function LoginPanel() {
  const router = useRouter();

  const handleLogin = () => {
    // 로그인 페이지로 이동
    router.push("/auth/login");
  };

  return (
    <div className={cx(style.section, style.empty)}>
      <button className={style.writeBtn} onClick={handleLogin}>
        로그인
      </button>

      <div className={style.tabContainer}>
        <p>아직 회원이 아니신가요?</p>
        <Link className={style.signUp} href="/auth/signup">
          회원가입
        </Link>
      </div>
    </div>
  );
}
