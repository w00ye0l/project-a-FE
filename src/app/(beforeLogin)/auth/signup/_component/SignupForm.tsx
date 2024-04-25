"use client";

import cx from "classnames";
import { useFormState, useFormStatus } from "react-dom";
import onSubmit from "../../_lib/signup";
import style from "../page.module.css";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function SignupForm() {
  const [state, formAction] = useFormState(onSubmit, { message: "" });
  const { pending } = useFormStatus();
  const router = useRouter();

  function showMessage(message: string | null) {
    let text = "";

    if (message === "NO_USER_ID") {
      text = "아이디를 입력해주세요.";
    }
    if (message === "NO_PASSWORD") {
      text = "비밀번호를 입력해주세요.";
    }
    if (message === "INVALID_PASSWORD") {
      text = "비밀번호는 숫자, 영문, 특수문자를 포함한 8자 이상이어야 합니다.";
    }
    if (message === "NO_PASSWORD_CHECK") {
      text = "비밀번호 확인을 입력해주세요.";
    }
    if (message === "PASSWORD_MISMATCH") {
      text = "비밀번호가 일치하지 않습니다.";
    }
    if (message === "NO_EMAIL_ID") {
      text = "이메일을 입력해주세요.";
    }
    if (message === "NO_EMAIL_ADDRESS") {
      text = "이메일 주소를 선택해주세요.";
    }
    if (message === "USER_ALREADY_EXISTS") {
      text = "이미 존재하는 아이디입니다.";
    }
    if (message === "INVALID_DATA") {
      text = "회원가입에 실패했습니다. 다시 시도해주세요.";
    }

    if (text.length !== 0) {
      toast.error(text);
    } else if (message === "SUCCESS") {
      toast.success("회원가입이 완료되었습니다.");
      setTimeout(() => {
        router.push("/auth/login");
      }, 1000);
    }
    return "";
  }

  return (
    <form action={formAction} className={style.signupForm}>
      <div hidden>{showMessage(state?.message!)}</div>
      <div className={style.infoSection}>
        <div className={style.infoTab}>
          <label className={style.infoLabel} htmlFor="id">
            아이디
          </label>
          <input
            className={style.infoInput}
            type="text"
            id="id"
            name="userId"
            placeholder="영문 4자 이상, 최대 20자"
          />
        </div>

        <div className={style.infoTab}>
          <label className={style.infoLabel} htmlFor="pw">
            비밀번호
          </label>
          <input
            className={style.infoInput}
            type="password"
            id="pw"
            name="password"
            placeholder="숫자, 영문, 특수문자 포함 최소 8자 이상"
          />
        </div>

        <div className={style.infoTab}>
          <label className={style.infoLabel} htmlFor="pwChk">
            비밀번호 확인
          </label>
          <input
            className={style.infoInput}
            type="password"
            id="pwChk"
            name="passwordCheck"
            placeholder="비밀번호 한 번 더 입력"
          />
        </div>

        <div className={style.infoTab}>
          <label className={style.infoLabel} htmlFor="emailId">
            이메일 주소
          </label>
          <div className={style.infoEmailTab}>
            <input
              className={style.infoInput}
              type="text"
              id="emailId"
              name="emailId"
              placeholder="이메일 입력"
            />
            @
            <select
              className={cx(style.infoInput, style.infoEmailSelect)}
              id="emailAddress"
              name="emailAddress"
            >
              <option value="" hidden>
                선택해주세요.
              </option>
              <option value="naver.com">naver.com</option>
              <option value="gmail.com">gmail.com</option>
              <option value="hanmail.com">hanmail.com</option>
            </select>
          </div>
          <p className={style.infoTabSub}>
            아이디/비밀번호 찾기 시 사용되니 정확한 이메일을 입력해주세요.
          </p>
        </div>
      </div>

      <hr className={style.hr} />

      <div className={style.agreement}>
        <div className={`${style.agreementOption} ${style.agreementAll}`}>
          <input type="checkbox" />
          <label htmlFor="">
            약관 전체 동의<span className={style.optionSub}>(선택 포함)</span>
          </label>
        </div>
        <div className={style.agreementOption}>
          <input type="checkbox" name="marketingOne" />
          <label htmlFor="">
            만 14세 이상입니다.
            <span className={`${style.optionSub} ${style.optionRequired}`}>
              (필수)
            </span>
          </label>
        </div>
        <div className={style.agreementOption}>
          <input type="checkbox" name="marketingTwo" />
          <label htmlFor="">
            서비스 이용 약관
            <span className={`${style.optionSub} ${style.optionRequired}`}>
              (필수)
            </span>
          </label>
        </div>
        <div className={style.agreementOption}>
          <input type="checkbox" name="marketingThree" />
          <label htmlFor="">
            개인정보 수집 및 이용
            <span className={`${style.optionSub} ${style.optionRequired}`}>
              (필수)
            </span>
          </label>
        </div>
      </div>

      <button className={style.signupBtn} disabled={pending}>
        회원가입
      </button>
    </form>
  );
}
