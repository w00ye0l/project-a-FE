import Image from "next/image";
import style from "./page.module.css";
import MainNavBar from "./_component/MainNavBar";

export default function Home() {
  return (
    <main className={style.main}>
      {/* 메인 네비게이션 바 */}
      <MainNavBar />

      {/* 배너 */}
      <div className={style.bannerSection}>
        <div className={style.bannerContainer}>
          <div className={style.ad}>ads</div>
        </div>
      </div>

      {/* 메인 컨텐츠 */}
      <div className={style.contentSection}>
        <div className={style.contentContainer}>
          <div className={style.contentBox}>
            {/* <Image
              className={style.contentImg}
              src="/1.png"
              alt=""
              width={300}
              height={250}
            /> */}
            <div className={style.contentName}>
              <h1>견적내기</h1>
            </div>
          </div>
          <div className={style.contentBox}>
            {/* <Image
              className={style.contentImg}
              src="/2.png"
              alt=""
              width={300}
              height={250}
            /> */}
            <div className={style.contentName}>
              <h1>차량점검</h1>
            </div>
          </div>
          <div className={style.contentBox}>
            {/* <Image
              className={style.contentImg}
              src="/3.png"
              alt=""
              width={300}
              height={250}
            /> */}
            <div className={style.contentName}>
              <h1>커뮤니티</h1>
            </div>
          </div>
          <div className={style.contentBox}>
            {/* <Image
              className={style.contentImg}
              src="/4.png"
              alt=""
              width={300}
              height={250}
            /> */}
            <div className={style.contentName}>
              <h1>딜러옥션</h1>
            </div>
          </div>
        </div>
      </div>
      <footer className={style.footerSection}>
        <div className={style.footerContainer}>
          <h2>회사 소개</h2>
        </div>
      </footer>

      <div className={style.counselBtn}>
        <Image
          className={style.icon}
          src="/icon/counsel.png"
          alt=""
          width={36}
          height={54.27}
        />
      </div>
    </main>
  );
}
