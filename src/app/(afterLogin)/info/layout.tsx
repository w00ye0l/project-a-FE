import { Suspense } from "react";
import style from "./layout.module.css";
import Footer from "@/app/_component/Footer";
import MenuButtons from "@/app/_component/MenuButtons";

export default function CarInfoLayoutPage({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className={style.main}>
      <Suspense fallback={<p>Loading...</p>}>
        <section className={style.section}>{children}</section>
      </Suspense>

      <Footer />

      <MenuButtons />
    </main>
  );
}
