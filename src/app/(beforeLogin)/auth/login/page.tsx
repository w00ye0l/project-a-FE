"use client";

import Link from "next/link";
import cx from "classnames";
import style from "./page.module.css";
import LoginForm from "./_component/LoginForm";
import Image from "next/image";
import { toast } from "sonner";

export default function LoginPage() {
  const onKakaoLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_BASE_URL}/oauth2/authorization/kakao`;
  };

  const onNaverLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_BASE_URL}/oauth2/authorization/naver`;
  };

  const onGoogleLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_BASE_URL}/oauth2/authorization/google`;
  };

  const onFacebookLogin = () => {
    toast.warning("페이스북 로그인은 준비 중입니다.");
    // window.location.href = `${process.env.NEXT_PUBLIC_BASE_URL}/oauth2/authorization/facebook`;
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
        <div onClick={onKakaoLogin} className={style.socialLoginBtn}>
          <div className={cx(style.socialLoginImg, style.kakaoLogin)}>
            <Image
              src="/icon/kakao.png"
              width={60}
              height={60}
              alt="naver_login"
            />
          </div>
          <p className={style.loginName}>카카오 로그인</p>
        </div>

        <div onClick={onNaverLogin} className={style.socialLoginBtn}>
          <div className={cx(style.socialLoginImg, style.naverLogin)}>
            <Image
              src="/icon/naver.png"
              width={60}
              height={60}
              alt="naver_login"
            />
          </div>
          <p className={style.loginName}>네이버 로그인</p>
        </div>

        <div onClick={onGoogleLogin} className={style.socialLoginBtn}>
          <div className={cx(style.socialLoginImg, style.googleLogin)}>
            <Image
              src="/icon/google.png"
              width={60}
              height={60}
              alt="naver_login"
            />
          </div>
          <p className={style.loginName}>구글 로그인</p>
        </div>

        <div onClick={onFacebookLogin} className={style.socialLoginBtn}>
          <div className={cx(style.socialLoginImg, style.facebookLogin)}>
            <Image
              src="/icon/facebook.png"
              width={60}
              height={60}
              alt="naver_login"
            />
          </div>
          <p className={style.loginName}>페이스북 로그인</p>
        </div>
      </div>

      <Image
        className={style.eventSection}
        src="/ad/440x120.png"
        width={440}
        height={120}
        alt="login_ad"
      />
    </>
  );
}
