import style from "./page.module.css";
import TopCarCard from "../_component/TopCarCard";
import CarList from "../_component/CarList";

export default function AuctionDealerPage() {
  return (
    <>
      <h1 className={style.title}>
        오늘 마감
        <span className={style.default}>Today&apos;s closing</span>
      </h1>

      <div className={style.deadline}>
        {/* 차 하나 */}
        <TopCarCard type="deadline" />
        <TopCarCard type="deadline" />
        <TopCarCard type="deadline" />
        <TopCarCard type="deadline" />
        <TopCarCard type="deadline" />
      </div>

      {/* 차 리스트 */}
      <CarList auction="dealer" country="all" />
    </>
  );
}
