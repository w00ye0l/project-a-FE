import MainNav from "./_component/MainNav";
import NavProvider from "./_component/NavProvider";
import SubNav from "./_component/SubNav";
import style from "./admin.module.css";
import cx from "classnames";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NavProvider>
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
          <SubNav />

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

            <div className={style.mainContainer}>{children}</div>
          </article>
        </section>
      </main>
    </NavProvider>
  );
}
