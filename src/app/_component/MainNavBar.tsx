"use client";

import style from "@/app/_component/mainNavBar.module.css";
import cx from "classnames";
import Link from "next/link";
import LogoutButton from "./LogoutButton";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

export default function MainNavBar() {
  const { data: session } = useSession();
  const pathname = usePathname();

  if (
    !pathname.startsWith("/car/estimate/end") &&
    pathname.startsWith("/car/estimate")
  ) {
    return;
  }

  return (
    <div className={style.main}>
      <div className={style.contentSection}>
        <div className={style.logoMenuSection}>
          <Link href="/" className={style.logo}>
            <Image src="/logo.png" width={800} height={800} alt="MASTER CAR" />
            <h1 className={style.logoName}>MASTER CAR</h1>
          </Link>

          <div className={`${style.linkSection} ${style.left}`}>
            <Link href="/car" className={cx(style.link, style.activeLink)}>
              내 차 할래?
            </Link>
            <Link href="/car" className={style.link}>
              차량정보
            </Link>
            <Link href="/auction/dealer" className={style.link}>
              옥션
            </Link>
            <Link href="/community" className={style.link}>
              커뮤니티
            </Link>
            {/* <Link href="/" className={style.link}>
              고객지원
            </Link> */}

            {session?.user && (
              <Link href="/admin" className={style.link}>
                ADMIN
              </Link>
            )}
          </div>
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

              <div className={style.divider}></div>

              <Link href="/" className={cx(style.btn, style.outlineBtn)}>
                제휴사 로그인
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
