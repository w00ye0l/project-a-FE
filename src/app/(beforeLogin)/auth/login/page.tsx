"use client";

import Link from "next/link";
import cx from "classnames";
import style from "./page.module.css";
import LoginForm from "./_component/LoginForm";

export default function LoginPage() {
  const onKakaoLogin = () => {
    window.location.href = "http://localhost:8080/oauth2/authorization/kakao";
  };

  const onNaverLogin = () => {
    window.location.href = "http://localhost:8080/oauth2/authorization/naver";
  };

  const onGoogleLogin = () => {
    window.location.href = "http://localhost:8080/oauth2/authorization/google";
  };

  const onFacebookLogin = () => {
    window.location.href =
      "http://localhost:8080/oauth2/authorization/facebook";
  };

  return (
    <>
      <LoginForm />

      <div className={style.authLinkSection}>
        <Link className={style.authLink} href="/user/find/id">
          아이디 찾기
        </Link>
        <Link className={style.authLink} href="/user/find/pw">
          비밀번호 찾기
        </Link>
        <Link className={style.authLink} href="/auth/signup">
          회원가입
        </Link>
      </div>

      <div className={style.socialLoginSection}>
        <div
          onClick={onNaverLogin}
          className={cx(style.socialLoginBtn, style.naverLogin)}
        >
          <div className={style.socialLoginImg}></div>
          <p className={style.loginName}>네이버 로그인</p>
        </div>
        <div
          onClick={onKakaoLogin}
          className={cx(style.socialLoginBtn, style.kakaoLogin)}
        >
          <div className={style.socialLoginImg}></div>
          <p className={style.loginName}>카카오 로그인</p>
        </div>
        <div
          onClick={onFacebookLogin}
          className={cx(style.socialLoginBtn, style.facebookLogin)}
        >
          <div className={style.socialLoginImg}></div>
          <p className={style.loginName}>페이스북 로그인</p>
        </div>
        <div
          onClick={onGoogleLogin}
          className={cx(style.socialLoginBtn, style.googleLogin)}
        >
          <div className={style.socialLoginImg}></div>
          <p className={style.loginName}>구글 로그인</p>
        </div>
      </div>

      <div className={style.eventSection}>Event & Ads</div>
    </>
  );
}
