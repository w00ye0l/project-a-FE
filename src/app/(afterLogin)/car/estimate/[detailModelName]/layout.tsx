import { Suspense } from "react";
import style from "./layout.module.css";
import Tab from "../../_component/Tab";
import CarImage from "../../_component/CarImage";
import CarPrice from "../../_component/CarPrice";
import EstimateButtons from "../../_component/EstimateButtons";

export default function CarLayoutPage({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className={style.main}>
      <Suspense fallback={<p>Loading...</p>}>
        <Tab />

        <div className={style.contentSection}>
          <CarImage />

          <div className={style.optionSection}>
            <div className={style.optionContainer}>
              <CarPrice />

              {children}
            </div>

            <EstimateButtons />
          </div>
        </div>
      </Suspense>
    </main>
  );
}
