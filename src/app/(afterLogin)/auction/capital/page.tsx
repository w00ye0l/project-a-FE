import CarList from "../_component/CarList";
import TopCarCard from "../_component/TopCarCard";
import style from "./page.module.css";

export default function AuctionCapitalPage() {
  return (
    <>
      <h1 className={style.title}>
        프로모션
        <span className={style.default}>48개월 선납금30% 기준</span>
      </h1>

      <div className={style.promotion}>
        {/* 차 하나 */}
        <TopCarCard type="promotion" />
        <TopCarCard type="promotion" />
        <TopCarCard type="promotion" />
        <TopCarCard type="promotion" />
        <TopCarCard type="promotion" />
      </div>

      {/* 차 리스트 */}
      <CarList auction="capital" country="all" />
    </>
  );
}
