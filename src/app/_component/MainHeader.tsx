import style from "@/app/_component/mainHeader.module.css";
import Link from "next/link";

export default function MainHeader() {
  return (
    <div className={style.main}>
      <div className={`${style.linkSection} ${style.left}`}>
        <Link href="/car" className={style.link}>
          차량 정보
        </Link>
        <Link href="https://naver.com" className={style.link}>
          테스트 링크2
        </Link>
      </div>

      <div className={style.logo}>로고</div>

      <div className={`${style.linkSection} ${style.right}`}>
        <Link href="/auth/signup" className={style.link}>
          회원가입
        </Link>
        <Link href="/auth/login" className={style.link}>
          로그인
        </Link>
      </div>
    </div>
  );
}
