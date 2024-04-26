"use client";

import cx from "classnames";
import style from "../page.module.css";
import { useRouter } from "next/navigation";
import onSubmit from "../../_lib/login";
import { useFormState, useFormStatus } from "react-dom";
import { toast } from "sonner";

export default function LoginForm() {
  const [state, formAction] = useFormState(onSubmit, { message: "" });
  const { pending } = useFormStatus();
  const router = useRouter();

  function showMessage(message: string | null) {
    let text = "";

    if (message === "NO_EMAIL_OR_USER_ID") {
      text = "아이디를 입력해주세요.";
    }
    if (message === "NO_PASSWORD") {
      text = "비밀번호를 입력해주세요.";
    }
    if (message === "INVALID_DATA") {
      text = "로그인에 실패했습니다. 다시 시도해주세요.";
    }

    if (text.length !== 0) {
      toast.error(text);
    } else if (message === "SUCCESS") {
      router.refresh();
      router.push("/");
      toast.success("로그인 성공");
    }
    return "";
  }

  return (
    <form className={style.loginForm} action={formAction}>
      <div hidden>{showMessage(state?.message!)}</div>
      <div className={style.loginOption}>
        <div className={style.saveOptionContainer}>
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
        </div>
      </div>
      <input
        className={cx(style.input, style.id)}
        type="text"
        name="username"
        placeholder="아이디/인증 메일"
      />
      <input
        className={cx(style.input, style.password)}
        type="password"
        name="password"
        placeholder="비밀번호"
      />
      <button className={style.loginBtn} disabled={pending}>
        로그인
      </button>
    </form>
  );
}
