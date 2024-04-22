import Banner from "./Banner";
import MainHeader from "./MainHeader";
import style from "./header.module.css";

export default function Header() {
  return (
    <>
      <Banner>
        <MainHeader />
        <div className={style.titleSection}>
          <p className={style.subTitle}>Masters that Inspire</p>
          <h1 className={style.title}>The 2024 K9</h1>
          {/* <div className={style.buttonSection}>
            <button className={`${style.button} ${style.detailBtn}`}>
              자세히 보기
            </button>
            <button className={`${style.button} ${style.calBtn}`}>
              견적 내기
            </button>
          </div> */}
        </div>
      </Banner>
    </>
  );
}
