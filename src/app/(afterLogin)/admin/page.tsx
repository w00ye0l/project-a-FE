import AGGrid from "./_component/AGGrid";
import style from "./admin.module.css";
import cx from "classnames";
import MainNav from "./_component/MainNav";
import CountryListSelect from "./_component/CountryListSelect";
import BrandListSelect from "./_component/BrandListSelect";

export default function AdminPage() {
  return (
    <main className={style.main}>
      <aside className={style.left}>
        <h1>ADMIN</h1>

        <div className={style.profile}>
          <div className={style.profileImg}></div>
          <p>홍길동님</p>
        </div>

        <MainNav />
      </aside>

      <section className={style.right}>
        <nav>
          <ul className={style.subNav}>
            <li>차량 관리</li>
            <li className={cx(style.subLi, style.active)}>데이터 추가</li>
          </ul>
        </nav>

        <article className={style.mainSection}>
          <div className={style.buttonSection}>
            <div className={style.excelButtonSection}>
              <button className={cx(style.button, style.excelOpen)}>
                엑셀 열기
              </button>
              <button className={cx(style.button, style.excelUpload)}>
                엑셀 업로드
              </button>
            </div>
            <button className={cx(style.button, style.dbUpload)}>
              DB 업로드
            </button>
          </div>

          <div className={style.mainContainer}>
            <div className={style.infoSection}>
              <CountryListSelect />

              <BrandListSelect />

              <div className={style.infoContainer}>
                <p className={style.infoTitle}>모델명</p>
                <select className={style.select} name="" id="">
                  <option value="">캐스퍼</option>
                  <option value="">베뉴</option>
                </select>
              </div>

              <div className={style.infoContainer}>
                <p className={style.infoTitle}>세부모델명</p>
                <select className={style.select} name="" id="">
                  <option value="">캐스퍼</option>
                  <option value="">캐스퍼</option>
                </select>
              </div>
            </div>

            <div className={style.dataSection}>
              <h1 className={style.dataTitle}>차량 데이터 추가</h1>

              <AGGrid />
            </div>
          </div>
        </article>
      </section>
    </main>
  );
}
