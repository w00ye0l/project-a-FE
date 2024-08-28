"use client";

import cx from "classnames";
import style from "../page.module.css";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { FormEventHandler, useState } from "react";
import { signIn } from "next-auth/react";

export default function LoginForm() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  // 로그인 기능
  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    try {
      // auth.js의 signIn 함수 호출
      const response = await signIn("default-login", {
        userIdOrEmail: id,
        password,
        redirect: false,
      });

      // console.log({ response });
      // 성공 시
      // response: {
      //   error: null,
      //   status: 200,
      //   ok: true,
      //   url: 'http://localhost:3000/auth/login'
      // }

      // 실패 시
      // response: {
      //   error: 'Configuration',
      //   status: 200,
      //   ok: true,
      //   url: null
      // }

      if (response?.error) {
        toast.error("아이디와 비밀번호를 다시 확인해주세요.");
      } else if (response?.error === null) {
        router.replace("/mypage");
        router.refresh();
        toast.success("로그인 성공");
      }
    } catch (error) {
      // console.error(error);
      toast.error("로그인에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <form className={style.loginForm} onSubmit={onSubmit}>
      <div className={style.loginOption}>
        {/* <div className={style.saveOptionContainer}>
          <div className={cx(style.saveOption, style.saveLogin)}>
            <input type="checkbox" name="saveLogin" id="saveLogin" />
            <label htmlFor="saveLogin">로그인 상태 유지</label>
          </div>
          <div className={cx(style.saveOption, style.saveId)}>
            <input type="checkbox" name="saveId" id="saveId" />
            <label htmlFor="saveId">아이디 저장</label>
          </div>
        </div>
        <div className={style.userOptionContainer}>
          <div className={style.userOption}>
            <input type="radio" name="userType" id="normalUser" />
            <label htmlFor="normalUser">일반회원</label>
          </div>
          <div className={style.userOption}>
            <input type="radio" name="userType" id="dealerUser" />
            <label htmlFor="dealerUser">딜러회원</label>
          </div>
        </div> */}
      </div>
      <input
        className={cx(style.input, style.id)}
        type="text"
        name="username"
        value={id}
        onChange={(e) => setId(e.target.value)}
        placeholder="아이디/인증 메일"
      />
      <input
        className={cx(style.input, style.password)}
        type="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="비밀번호"
      />
      <button className={style.loginBtn} disabled={!id && !password}>
        로그인
      </button>
    </form>
  );
}
