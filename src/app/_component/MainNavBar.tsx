import style from "@/app/_component/mainNavBar.module.css";
import Link from "next/link";
import LogoutButton from "./LogoutButton";
import { auth } from "@/auth";

export default async function MainNavBar() {
  const session = await auth();

  return (
    <div className={style.main}>
      <div className={`${style.linkSection} ${style.left}`}>
        <Link href="/car" className={style.link}>
          차량 정보
        </Link>
        <Link href="/community" className={style.link}>
          커뮤니티
        </Link>
        <Link href="/admin" className={style.link}>
          ADMIN
        </Link>
      </div>

      <div className={style.logo}>로고</div>

      <div className={`${style.linkSection} ${style.right}`}>
        {!session?.user ? (
          <>
            <Link href="/auth/signup" className={style.link}>
              회원가입
            </Link>
            <Link href="/auth/login" className={style.link}>
              로그인
            </Link>
          </>
        ) : (
          <>
            <Link href="/mypage" className={style.link}>
              마이 페이지
            </Link>
            <LogoutButton me={session} />
          </>
        )}
      </div>
    </div>
  );
}
