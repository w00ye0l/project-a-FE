import style from "@/app/_component/mainNavBar.module.css";
import cx from "classnames";
import Link from "next/link";
import LogoutButton from "./LogoutButton";
import { auth } from "@/auth";

export default async function MainNavBar() {
  const session = await auth();

  return (
    <div className={style.main}>
      <div className={style.contentSection}>
        <div className={style.logo}>로고</div>

        <div className={`${style.linkSection} ${style.left}`}>
          <Link href="/car" className={style.link}>
            차량정보
          </Link>
          <Link href="/community" className={style.link}>
            커뮤니티
          </Link>

          {session?.user && (
            <Link href="/admin" className={style.link}>
              ADMIN
            </Link>
          )}
        </div>

        <div className={cx(style.linkSection, style.right)}>
          {!session?.user ? (
            <>
              <Link
                href="/auth/login"
                className={cx(style.btn, style.outlineBtn)}
              >
                로그인
              </Link>
              <Link href="/auth/signup" className={cx(style.btn)}>
                회원가입
              </Link>
            </>
          ) : (
            <>
              <Link href="/mypage" className={cx(style.btn)}>
                마이 페이지
              </Link>
              <LogoutButton me={session} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
