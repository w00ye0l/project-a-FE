import { Suspense } from "react";
import style from "./layout.module.css";
import cx from "classnames";
import Tab from "./_component/Tab";

export default function CarLayoutPage({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className={cx(style.main)}>
      <Suspense fallback={<p>Loading...</p>}>
        <section className={cx(style.section)}>{children}</section>
      </Suspense>
    </main>
  );
}
