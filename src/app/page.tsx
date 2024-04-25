import Image from "next/image";
import Header from "./_component/Header";
import style from "./page.module.css";

export default function Home() {
  return (
    <main className={style.main}>
      <Header />
      <div className={style.contentSection}>
        <div className={style.contentContainer}>
          <div className={style.contentBox}>
            <Image
              className={style.contentImg}
              src="/1.png"
              alt=""
              width={300}
              height={250}
            />
          </div>
          <div className={style.contentBox}>
            <Image
              className={style.contentImg}
              src="/2.png"
              alt=""
              width={300}
              height={250}
            />
          </div>
          <div className={style.contentBox}>
            <Image
              className={style.contentImg}
              src="/3.png"
              alt=""
              width={300}
              height={250}
            />
          </div>
          <div className={style.contentBox}>
            <Image
              className={style.contentImg}
              src="/4.png"
              alt=""
              width={300}
              height={250}
            />
          </div>
          <div className={style.contentBox}>
            <Image
              className={style.contentImg}
              src="/5.png"
              alt=""
              width={300}
              height={250}
            />
          </div>
          <div className={style.contentBox}>
            <Image
              className={style.contentImg}
              src="/6.png"
              alt=""
              width={300}
              height={250}
            />
          </div>
        </div>
        <div className={`${style.ad} ${style.left}`}>ad</div>
        <div className={`${style.ad} ${style.right}`}>ad</div>
      </div>
      <footer className={style.footer}></footer>
    </main>
  );
}
