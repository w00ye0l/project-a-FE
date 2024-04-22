"use client";

import Link from "next/link";
import style from "./page.module.css";

export default function LoginPage() {
  const onNaverLogin = () => {
    // window.location.href = "http://localhost:8080/oauth2/authorization/naver";
  };

  const onGoogleLogin = () => {
    // window.location.href = "http://localhost:8080/oauth2/authorization/google";
  };

  const getData = () => {
    fetch("http://localhost:8080/my", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data);
      })
      .catch((error) => alert(error));
  };

  return (
    <>
      <form className={style.loginForm} action="">
        <div className={style.loginOption}>
          <div className={style.saveOptionContainer}>
            <div className={`${style.saveOption} ${style.saveLogin}`}>
              <input type="checkbox" name="saveLogin" id="saveLogin" />
              <label htmlFor="saveLogin">로그인 상태 유지</label>
            </div>
            <div className={`${style.saveOption} ${style.saveId}`}>
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
          className={`${style.input} ${style.id}`}
          type="text"
          placeholder="아이디/인증 메일"
        />
        <input
          className={`${style.input} ${style.password}`}
          type="password"
          placeholder="비밀번호"
        />
        <button className={style.loginBtn}>로그인</button>
      </form>

      <div className={style.authLinkSection}>
        <Link className={style.authLink} href="https://naver.com">
          아이디 찾기
        </Link>
        <Link className={style.authLink} href="https://naver.com">
          비밀번호 찾기
        </Link>
        <Link className={style.authLink} href="/auth/signup">
          회원가입
        </Link>
      </div>

      <div onClick={getData}>TEST</div>

      <div className={style.socialLoginSection}>
        <div
          onClick={onNaverLogin}
          className={`${style.socialLoginBtn} ${style.naverLogin}`}
        >
          <div className={style.socialLoginImg}></div>
          <p className={style.loginName}>네이버 로그인</p>
        </div>
        <div className={`${style.socialLoginBtn} ${style.kakaoLogin}`}>
          <div className={style.socialLoginImg}></div>
          <p className={style.loginName}>카카오 로그인</p>
        </div>
        <div className={`${style.socialLoginBtn} ${style.facebookLogin}`}>
          <div className={style.socialLoginImg}></div>
          <p className={style.loginName}>페이스북 로그인</p>
        </div>
        <div
          onClick={onGoogleLogin}
          className={`${style.socialLoginBtn} ${style.googleLogin}`}
        >
          <div className={style.socialLoginImg}></div>
          <p className={style.loginName}>구글 로그인</p>
        </div>
      </div>

      <div className={style.eventSection}>Event & Ads</div>
    </>
  );
}
