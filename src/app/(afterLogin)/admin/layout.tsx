import { Suspense } from "react";
import MainNav from "./_component/MainNav";
import SubNav from "./_component/SubNav";
import style from "./admin.module.css";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
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

          {children}
        </section>
      </main>
    </Suspense>
  );
}
