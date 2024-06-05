import Banner from "./Banner";
import MainNavBar from "./MainNavBar";
import style from "./header.module.css";

export default function Header() {
  return (
    <>
      <Banner>
        <MainNavBar />
        <div className={style.titleSection}>
          <p className={style.subTitle}>Masters that Inspire</p>
          <h1 className={style.title}>The 2024 K9</h1>
        </div>
      </Banner>
    </>
  );
}
